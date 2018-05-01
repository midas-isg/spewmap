package edu.pitt.isg.spewmap.spe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.vividsolutions.jts.geom.Geometry;
import edu.pitt.isg.spewmap.geom.Properties;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Data
@JsonInclude(NON_NULL)
public class Household implements Properties {
    @Id
    @JsonIgnore
    private Long id;
    private String puma;
    private Integer persons;
    /** Total income */
    private Integer inctot;
    private String hid;
    private Geometry point;
}
