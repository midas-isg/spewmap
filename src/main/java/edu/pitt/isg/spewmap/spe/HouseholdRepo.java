package edu.pitt.isg.spewmap.spe;

import org.springframework.data.geo.Polygon;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface HouseholdRepo extends ReactiveMongoRepository<Household, String> {
    Flux<Household> findByPointWithin(Polygon polygon);
}
