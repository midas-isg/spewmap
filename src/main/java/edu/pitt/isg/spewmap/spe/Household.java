package edu.pitt.isg.spewmap.spe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
//@Document(collection = "map")
@Document(collection = "mapHh")
public class Household {
    @Id @JsonIgnore
    private String id;
    @Field("NP")
    private int persons;
    @Field("HINCP")
    private int income;
    @JsonIgnore
//    private double[] location;
    private double[] point;
}
