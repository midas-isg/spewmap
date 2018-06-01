package edu.pitt.isg.spewmap.web;

import com.google.gson.Gson;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.Point;
import edu.pitt.isg.spewmap.ResourceNotFound;
import edu.pitt.isg.spewmap.geom.Feature;
import edu.pitt.isg.spewmap.geom.FeatureCollection;
import edu.pitt.isg.spewmap.geom.GeometryAid;
import edu.pitt.isg.spewmap.geom.PropertyMap;
import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Stream;

import static edu.pitt.isg.spewmap.geom.GeometryAid.GEOJSON;
import static java.util.Arrays.stream;
import static java.util.stream.Collectors.joining;


@RestController
@RequestMapping("/households")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    private static final String READ = "/{id}";
    private static final String DUMP_PATH = "/mnt/consus/data/shared_group_data/syneco/spewmap/usa.pp.arrays.geojson";
//    private static final String DUMP_PATH = "/tmp/us.geojson";
    private static final String BBOX = "/bbox/{xMin},{yMin},{xMax},{yMax}";

    private final HouseholdRepo repo;
    private final GeometryAid aid;
    private final TransactionTemplate transactionTemplate;

    @RequestMapping(path=READ, produces={GEOJSON})
    public Object readGeoJson(@PathVariable String id){
        return aid.toFeature(read(id));
    }

    @GetMapping("/dump")
    public Object dump(Pageable pageable) throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("filePath", DUMP_PATH);
        body.put("pageable", pageable);
        log.info("Creating future");
        Executors.newScheduledThreadPool(1).schedule(
                () -> populateFileInTransaction(pageable),
                0, TimeUnit.SECONDS
        );
        log.info("Returning " + body);
        return body;
    }

    private void populateFileInTransaction(Pageable pageable) {
        transactionTemplate.setReadOnly(true);
        transactionTemplate.execute(transactionStatus -> {
            populateFile(pageable);
            transactionStatus.setRollbackOnly();
            return null;
        });
    }

    private void populateFile(Pageable pageable) {
        try {
            log.info("populateFile");
            final  Gson gson = new Gson();
            final int pageSize = pageable.getPageSize();
            try (PrintWriter writer = new PrintWriter(DUMP_PATH, "UTF-8")) {
                try (Stream<Household> content = repo.findAllWithLimit(pageSize)) {
                    content.forEach(hh -> writer.println(toGeoJson(gson, hh)));
                }
            }
            log.info("done for " + pageSize);
        } catch (Exception e){
            log.error("populateFile failed", e);
        }
    }

    private String toGeoJson(Gson g, Household hh) {
        final Feature f = aid.toFeature(hh);
        return g.toJson(f.featurePoint2d());
    }

    @GetMapping(READ)
    public Household read(@PathVariable String id){
        try {
            return repo.findById(id).get();
        } catch (NoSuchElementException e){
            throw new ResourceNotFound("No household with READ = " + id, e);
        }
    }


    @GetMapping(BBOX)
    public Object findAllAsGeoJosnByBoundingBox(@PathVariable Double xMin,
                                       @PathVariable Double yMin,
                                       @PathVariable Double xMax,
                                       @PathVariable Double yMax,
                                                Pageable pageable) throws Exception {
        log.info("finding ...");
        Page<Household> page = getHouseholds(xMin, yMin, xMax, yMax, pageable);
        List<Household> all = page.getContent();
        final String querySummary = "# Points = " + all.size() + " / " + pageable.getPageSize() + " / " + page.getTotalElements();
        log.info(querySummary);
        final Feature feature = toFeature(all);
        final PropertyMap properties = (PropertyMap) feature.getProperties();
        properties.put("querySummary", querySummary);
        return feature;
    }

    @PostMapping("/api/summarize")
    public Object summarize(@RequestBody Geometry geometry){
        log.info("summarizing " + geometry + " ...");
        final List<Household> households = repo.findWithinGeometry(geometry, null).getContent();
        log.info("summarized # Points: " + households.size());
        final Map<String, Object> stat = stat(households);
        log.info("summarized finished.");
        return stat;
    }

    private Map<String, Object> stat(List<Household> households) {
        final Map<String, Object> map = new HashMap<>();
        final int[] persons = toIntArray(households, Household::getPersons);
        final int[] incomes = toIntArray(households, Household::getIncome);
        map.put("households", households.size());
        map.put("persons", basicStat(persons));
        map.put("income", basicStat(incomes));
        return map;
    }

    private int[] toIntArray(List<Household> households,
                             Function<Household, Integer> intFunction) {
        return households.stream()
                    .map(intFunction)
                    .filter(Objects::nonNull)
                    .mapToInt(Integer::intValue).toArray();
    }

    private Map<String, Object> basicStat(int[] ints) {
        final Map<String, Object> map = new HashMap<>();
        map.put("sum", stream(ints).sum());
        map.put("average", stream(ints).average());
        map.put("max", stream(ints).max());
        map.put("min", stream(ints).min());
        map.put("count", ints.length);
        return map;
    }

    @GetMapping("/api" + BBOX)
    public Object findAllByBoundingBox(@PathVariable Double xMin,
                                                @PathVariable Double yMin,
                                                @PathVariable Double xMax,
                                                @PathVariable Double yMax,
                                                Pageable pageable){
        log.info("finding ...");
        Page<Household> page = getHouseholds(xMin, yMin, xMax, yMax, pageable);
        List<Household> all = page.getContent();
        final String querySummary = "# Points = " + all.size() + " / " + pageable.getPageSize() + " / " + page.getTotalElements();
        log.info(querySummary);
        final FeatureCollection fc = aid.toFeatureCollection(all);
        final Map<String, Object> properties = fc.getProperties();
        properties.put("querySummary", querySummary);

        log.info("Returned object");
        return fc;
    }

    private Page<Household> getHouseholds(@PathVariable Double xMin, @PathVariable Double yMin, @PathVariable Double xMax, @PathVariable Double yMax, Pageable page) {
        final Geometry box = aid.boxPolygon(xMin, yMin, xMax, yMax);
        return repo.findWithinGeometry(box, page);
    }

    public Feature toFeature(List<Household> hhs) throws Exception{
        final Point[] points = hhs.stream()
                .map(Household::getPoint)
                .toArray(Point[]::new);
        final Feature f = new Feature();
        final Geometry geometry = new MultiPoint(points, new GeometryFactory());
        f.setGeometry(geometry);
        f.setProperties(new PropertyMap());
        return f;
    }

    public Feature toFeature1(List<Household> hhs) throws Exception{
        final String coordinates = hhs.stream()
                .map(this::toArray)
                .collect(joining(","));
        final Feature f = new Feature();
        final Geometry geometry = aid.wktToGeometry("MultiPoint(" + coordinates + ")");
        f.setGeometry(geometry);
        return f;
    }

    private String toArray(Household household) {
        final Geometry point = household.getPoint();
        final Coordinate coordinate = point.getCoordinate();
        return coordinate.x + " " + coordinate.y;
    }
}
