package edu.pitt.isg.spewmap.web;

import com.google.gson.Gson;
import edu.pitt.isg.spewmap.spe.HouseholdRule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

import static java.time.Duration.ofMillis;
import static org.springframework.http.MediaType.*;


@RestController
@RequestMapping("/households/api")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    final HouseholdRule rule;
    Map<Integer, Mono<String>> id2mono = new HashMap<>();
    int id = 0;

    @PostMapping("/summarize")
    public Mono<String> summarize(@RequestBody GeoJsonMultiPolygon multiPolygon){
        id2mono.put(++id, rule.summarize(multiPolygon).map(this::toJson));
        return Mono.just("redirect:stream/" + id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException() {
        return "Not Found";
    }

    @GetMapping(value = "/stream/{id}", produces = TEXT_EVENT_STREAM_VALUE)
    public Object stream(@PathVariable Integer id){
        Mono<String> mono = id2mono.get(id);
        if (id == null || mono == null)
            throw new NoSuchElementException("id = " + id);
        Flux<String> flux = flux(mono);
        id2mono.remove(id);
        return flux;
    }

    private Flux<String> flux(Publisher<String> slow) {
        return Flux.from(fluxInfinity())
                .takeUntilOther(slow)
                .concatWith(slow);
    }

    private Flux<String> fluxInfinity() {
        return Flux.fromStream(Stream.generate(() -> waitMessage()))
                .delayElements(ofMillis(10_000))//.log()
                ;
    }

    private String  waitMessage() {
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Querying please wait.");
        map.put("pending", true);
        return toJson(map);
    }

    private String toJson(Object map) {
        return new Gson().toJson(map);
    }
}
