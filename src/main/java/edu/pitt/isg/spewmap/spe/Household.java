package edu.pitt.isg.spewmap.spe;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
//@Document(collection = "households")
@Document(collection = "mapHh")
public class Household {
    @Id
    private String id;
    private int NP;
    private double[] point;
}
