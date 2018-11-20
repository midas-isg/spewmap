package edu.pitt.isg.spewmap.spe;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.IntSummaryStatistics;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.summarizingInt;


@Service
@RequiredArgsConstructor
@Slf4j
public class HouseholdRule {
    private final HouseholdRepo repo;

    public Object summarize(GeoJsonPolygon polygon){
        return stat(repo.findByPointWithin(polygon));
    }

    private Mono<Map<String, Object>> stat(Flux<Household> households) {
        final Mono<Long> count =  households.count();
        final Mono<IntSummaryStatistics> income = summarize(households, Household::getIncome);
        final Mono<IntSummaryStatistics> persons = summarize(households, this::toPersons);
        final Mono<List<Household>> raw = households.collectList();

        return Mono.<Object, Object, Object, Object>zip(count, income, persons, raw).map(t -> {
            final Map<String, Object> map = new LinkedHashMap<>();
            map.put("households", t.getT1());
            map.put("income", t.getT2());
            map.put("persons", t.getT3());
//            map.put("raw", t.getT4());
            return map;
        });
    }

    private Mono<IntSummaryStatistics> summarize(Flux<Household> households, Function<Household, Integer> mapper) {
        return households.map(hh -> ofNullable(mapper.apply(hh)))
                .filter(Optional::isPresent)
                .collect(summarizingInt(Optional::get));
    }

    private Integer toPersons(Household hh) {
        final Integer persons = hh.getPersons();
        if (persons != null)
            return persons;
        return hh.getNp();
    }
}
