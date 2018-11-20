package edu.pitt.isg.spewmap.web;

import edu.pitt.isg.spewmap.spe.HouseholdRule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/households/api")
@RequiredArgsConstructor
@Slf4j
public class HouseholdController {
    final HouseholdRule rule;

    @PostMapping("/summarize")
    public Object summarize(@RequestBody GeoJsonMultiPolygon multiPolygon){
        return rule.summarize(multiPolygon.getCoordinates().get(0));
    }
}
