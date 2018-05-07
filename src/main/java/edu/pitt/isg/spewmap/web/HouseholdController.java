package edu.pitt.isg.spewmap.web;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

import static edu.pitt.isg.spewmap.geom.GeometryAid.GEOJSON;
import static java.util.Arrays.stream;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;


@RestController
@RequestMapping("/households")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    private static final String READ = "/{id}";
    private static final String BBOX = "/bbox/{xMin},{yMin},{xMax},{yMax}";

    private final HouseholdRepo repo;
    private final GeometryAid aid;

    @RequestMapping(path=READ, produces={GEOJSON})
    public Object readGeoJson(@PathVariable Long id){
        return aid.toFeature(read(id));
    }

    @GetMapping(READ)
    public Household read(@PathVariable Long id){
        try {
            final Household household = repo.findById(id).get();
            return household;
        } catch (NoSuchElementException e){
            throw new ResourceNotFound("No household with READ = " + id, e);
        }
    }


    @GetMapping(BBOX)
    //@RequestMapping(path=BBOX)//, produces={GEOJSON})
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
        return stat(households);
    }

    private Map<String, Object> stat(List<Household> households) {
        final Map<String, Object> map = new HashMap<>();
        final int[] persons = households.stream()
                .map(Household::getPersons)
                .mapToInt(Integer::intValue).toArray();
        final int[] incomes = households.stream()
                .map(Household::getIncome)
                .mapToInt(Integer::intValue).toArray();
        map.put("households", households.size());
        map.put("persons", basicStat(persons));
        map.put("income", basicStat(incomes));
        return map;
    }

    private Map<String, Object> basicStat(int[] persons) {
        final Map<String, Object> map = new HashMap<>();
        map.put("sum", stream(persons).sum());
        map.put("average", stream(persons).average());
        map.put("max", stream(persons).max());
        map.put("min", stream(persons).min());
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
