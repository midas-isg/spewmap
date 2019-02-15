package edu.pitt.isg.spewmap.web;

import com.google.gson.Gson;
import edu.pitt.isg.spewmap.spe.HouseholdRule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import static java.time.Duration.ofMillis;
import static org.springframework.http.MediaType.*;


@RestController
@RequestMapping("/households/api")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    final HouseholdRule rule;

    @PostMapping("/summarize")
    public Object summarize(@RequestBody GeoJsonMultiPolygon multiPolygon){
        return rule.summarize(multiPolygon);
    }

    @GetMapping(value = "/stream", produces = TEXT_EVENT_STREAM_VALUE)
    public Object stream(){
        return flux();
    }

    private Flux<String> flux() {
        Flux<String> slow = fluxSlow();
        return Flux.from(fluxInfinity())
                .takeUntilOther(slow)
                .concatWith(slow);
    }

    Flux<String> fluxSlow() {
        return Flux.just("Done").delayElements(ofMillis(100))
//                .log()
                ;
    }
    Flux<String> fluxInfinity() {
        ;

        return Flux.fromStream(Stream.generate(() -> waitMessage()))
                .delayElements(ofMillis(10))
//                .log()
                ;
    }

    private String  waitMessage() {
        Map<String, String> map = new HashMap<>();
        map.put("message", "Querying please wait.");
        return new Gson().toJson(map);
    }
}
