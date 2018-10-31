package edu.pitt.isg.spewmap.spe;

import org.springframework.data.geo.Polygon;
import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface HouseholdRepo extends ReactiveMongoRepository<Household, String> {
    Flux<Household> findAllByPointWithin(Polygon polygon);
    Flux<Household> findByPointWithin(GeoJson geometry);
}
