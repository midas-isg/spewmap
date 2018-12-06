package edu.pitt.isg.spewmap.spe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "map")
public class Household {
    @Id @JsonIgnore
    private String id;
    @Field("PERSONS")
    private Integer persons;
    @Field("NP")
    private Integer np;
    @Field("HINCP")
    private Integer income;
    @JsonIgnore
    private double[] location;
}
