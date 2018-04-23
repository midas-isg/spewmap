package edu.pitt.isg.spewmap.spe;

import com.vividsolutions.jts.geom.Geometry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HouseholdRepo extends JpaRepository<Household, Long> {
    @Query("select h from Household h where within(h.point, ?1) = true")
    List<Household> findAllWithinGeometry(Geometry filter);
}
