package edu.pitt.isg.spewmap.web;

import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.IntSummaryStatistics;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/households")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    private final HouseholdRepo repo;

    @GetMapping("/count")
    public Object count(){
        return repo.count();
    }

    @PostMapping("/summarize")
    public Object summarize(@RequestBody GeoJsonMultiPolygon multiPolygon){
        final GeoJsonPolygon polygon = multiPolygon.getCoordinates().get(0);
        return stat(repo.findByPointWithin(polygon));
    }

    @GetMapping("/summary")
    public Object summary(){
        return repo.findByPointWithin(polygon()).count(); // spew1.3.0 should return 61,397.
    }

    private GeoJsonPolygon polygon() {
        return new GeoJsonPolygon(
                new Point(-73.992514, 40.758934),
                new Point(-73.961138, 40.760348),
                new Point(-73.991658, 40.730006),
                new Point(-73.992514, 40.758934));
    }

    private Mono<Map<String, Object>> stat(Flux<Household> households) {
        final Mono<Long> count =  households.count();
        final Mono<IntSummaryStatistics> income = households
                .collect(Collectors.summarizingInt(Household::getIncome));
        final Mono<IntSummaryStatistics> persons = households
                .collect(Collectors.summarizingInt(Household::getPersons));
        final Mono<List<Household>> raw = households.collectList();

        return Mono.<Object, Object, Object, Object>zip(count, income, persons, raw).map(t -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("households", t.getT1());
            map.put("income", t.getT2());
            map.put("persons", t.getT3());
//            map.put("raw", t.getT4());
            return map;
        });
    }
}
