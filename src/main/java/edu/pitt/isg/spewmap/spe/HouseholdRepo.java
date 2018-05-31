package edu.pitt.isg.spewmap.spe;

import com.vividsolutions.jts.geom.Geometry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HouseholdRepo extends JpaRepository<Household, String> {
    @Query(value = "select h from Household h where within(h.point, ?1) = true",
            countQuery = "select count(*) from Household h where within(h.point, ?1) = true")
    Page<Household> findWithinGeometry(Geometry filter, Pageable page);

    @Query(value = "select * from Household h LIMIT ?1", nativeQuery=true)
    List<Household> findAllWithLimit(Integer limit);
}
