package edu.pitt.isg.spewmap;

import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

import static java.time.Duration.ofMillis;

public class FluxStreamTests {
    @Test
    void name() {
        List<String> l = flux()
                .collectList()
                .block();
//                .subscribe(System.out::println);
        System.out.println(l);

    }

    private Flux<String> flux() {
        Flux<String> slow = fluxSlow();
        return Flux.from(fluxRandom())
                .takeUntilOther(slow)
                .concatWith(slow);
    }

    Flux<String> fluxSlow() {
        return Flux.just("Done").delayElements(ofMillis(100))
//                .log()
                ;
    }
    Flux<String> fluxRandom() {
        return Flux.fromStream(Stream.generate(() -> ""))
                .delayElements(ofMillis(10))
//                .log()
                ;
    }
}
