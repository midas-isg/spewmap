package edu.pitt.isg.spewmap.spe;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.vividsolutions.jts.geom.Geometry;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import edu.pitt.isg.spewmap.geom.Properties;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Data
@JsonInclude(NON_NULL)
@TypeDefs({
        @TypeDef(
                name = "int-array",
                typeClass = IntArrayType.class
        )
})
public class Household implements Properties {
    private String puma;
    private Integer persons;
    private Integer income;
    @Id
    private String hid;
    private Geometry point;

    private Integer serialno;
    private String region;

    private String country;
    private Integer year;

    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] sexes;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] ages;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] races;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] schools;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] grades;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] employments;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] relationships;

    private Integer hhtype;
    private Integer pernum;
    @Type(type="int-array") @Column(columnDefinition="integer[]")
    private Integer[] incomes;
}
