package edu.pitt.isg.spewmap;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.vividsolutions.jts.geom.Geometry;

@Entity
@Data
public class Household {
    @Id
    private Long id;
    private String puma;
    private Integer persons;
    /** Total income */
    private Integer inctot;
    private String hid;
    @JsonIgnore
    private Geometry point;
}
