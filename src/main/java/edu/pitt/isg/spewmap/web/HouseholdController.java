package edu.pitt.isg.spewmap.web;

import com.vividsolutions.jts.geom.Geometry;
import edu.pitt.isg.spewmap.ResourceNotFound;
import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import edu.pitt.isg.spewmap.geom.GeometryAid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;



@RestController
@RequestMapping("/households")
@RequiredArgsConstructor
public class HouseholdController {
    private final HouseholdRepo repo;
    private final GeometryAid aid;

    @GetMapping("/{id}")
    public Household read(@PathVariable Long id){
        try {
            return repo.findById(id).get();
        } catch (NoSuchElementException e){
            throw new ResourceNotFound("No household with ID = " + id, e);
        }
    }


    @GetMapping("/bbox/{xMin},{yMin},{xMax},{yMax}")
    public Object findAllByBoundingBox(@PathVariable Double xMin,
                                       @PathVariable Double yMin,
                                       @PathVariable Double xMax,
                                       @PathVariable Double yMax){
        final Geometry box = aid.boxPolygon(xMin, yMin, xMax, yMax);
        final List<Household> households = repo.findAllWithinGeometry(box);
        return households;
    }

}
