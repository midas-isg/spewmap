package edu.pitt.isg.spewmap.spe;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BiFunction;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.ConditionalOperators.when;
import static org.springframework.data.mongodb.core.query.Criteria.where;


@Service
@RequiredArgsConstructor
@Slf4j
public class HouseholdRule {
    private final static String npFieldName = "np";
    private final static String personsFieldName = "persons";
    private final static String incomeFieldName = "income";
    private static final String HOUSEHOLDS = "households";
    private static final String COUNT = "count";
    private static final String SUM = "sum";
    private static final String MIN = "min";
    private static final String MAX = "max";
    private static final String AVERAGE = "average";

    private final ReactiveMongoTemplate template;

    public Object summarize(GeoJsonMultiPolygon multiPolygon){
        final MatchOperation match = match(within(multiPolygon));
        final GroupOperation group = addStats(group("countryId").count().as(HOUSEHOLDS))
//                .first("$$CURRENT").as("sample")
                ;
        final TypedAggregation<Household> aggregation = newAggregation(Household.class, match, group);
        final Flux<LinkedHashMap> results = template.aggregate(aggregation, "map", LinkedHashMap.class);
        return results.map(this::format);
    }

    private Criteria within(GeoJsonMultiPolygon multiPolygon) {
        return new Criteria().orOperator(
                multiPolygon.getCoordinates().stream()
                        .map(this::within)
                        .toArray(Criteria[]::new)
        );
    }

    private Criteria within(GeoJsonPolygon shape) {
        return where("location").within(shape);
    }

    private LinkedHashMap defaultMap() {
        final LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put(HOUSEHOLDS, 0);
        return map;
    }

    private GroupOperation addStats(GroupOperation groupOperation) {
        return addStats(personsFieldName,
                addStats(npFieldName,
                    addStats(incomeFieldName, groupOperation)
                )
        );
    }

    private GroupOperation addStats(String key, GroupOperation groupOperation) {
        return groupOperation
                .sum(countIfNumber(key)).as(key +"_" + COUNT)
                .sum(key).as(key +"_" + SUM)
                .min(key).as(key +"_" + MIN)
                .max(key).as(key +"_" + MAX)
                .avg(key).as(key +"_" + AVERAGE);
    }

    private ConditionalOperators.Cond countIfNumber(String key) {
        return when(where(key).gte(Double.NEGATIVE_INFINITY)).then(1).otherwise(0);
    }

    private Map<String, Object> format(Map<String, Object> raw) {
        final Map<String, Object> map = new LinkedHashMap<>();
        map.put(HOUSEHOLDS, 0);
        map.put("Country", raw.get("_id"));
        final Map<String, Object> pMap = new LinkedHashMap<>();
        final Map<String, Object> nMap = new LinkedHashMap<>();
        final Map<String, Object> iMap = new LinkedHashMap<>();
        map.put("income", iMap);
        map.put("persons", pMap);
        for (Map.Entry<String, Object> pair : raw.entrySet()){
            final String key = pair.getKey();
            if (key.startsWith(personsFieldName + "_")){
                pMap.put(newKey(key), pair.getValue());
            } else if (key.startsWith(npFieldName + "_")){
                nMap.put(newKey(key), pair.getValue());
            } else if (key.startsWith(incomeFieldName + "_")){
                iMap.put(newKey(key), pair.getValue());
            } else if (key.equals("_id")){
                ;
            } else {
                map.put(key, pair.getValue());
            }
        }
        mergeAsStats(pMap, nMap);
        return map;
    }

    private void mergeAsStats(Map<String, Object> map, Map<String, Object> map1) {
        update(map, map1, MIN, (a, b)-> Integer.min((int)a, (int)b));
        update(map, map1, MAX, (a, b)-> Integer.max((int)a, (int)b));
        update(map, map1, SUM, (a, b)-> (long)(int)a + (long)(int)b);
        updateAvgAndCount(map, map1);
    }

    private void updateAvgAndCount(Map<String, Object> map, Map<String, Object> map1) {
        final Object a = map.get(AVERAGE);
        final Object b = map1.get(AVERAGE);
        if (b == null)
            return;
        final Object c = map1.get(COUNT);
        if (a == null) {
            map.put(AVERAGE, b);
            map.put(COUNT, c);
            return;
        }
        int cnt = (int)map.get(COUNT);
        int cnt1 = (int)c;
        double sum = (double)a *  cnt;
        double sum1 = (double)b * cnt1;
        int count = cnt + cnt1;
        map.put(AVERAGE, (sum+sum1) / count);
        map.put(COUNT, count);
    }

    private void update(Map<String, Object> map, Map<String, Object> map1, String key, BiFunction<Object, Object, Object> fn) {
        final Object a = map.get(key);
        final Object b = map1.get(key);
        if (b == null)
            return;
        if (a == null) {
            map.put(key, b);
            return;
        }
        map.put(key, fn.apply(a, b));
    }

    private String newKey(String key) {
        return key.split("_")[1];
    }
}
