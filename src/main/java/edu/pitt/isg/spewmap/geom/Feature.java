package edu.pitt.isg.spewmap.geom;

import com.vividsolutions.jts.geom.Geometry;
import lombok.Data;

@Data
public class Feature {
    public static final String TYPE = "Feature";

    private String type = TYPE;
    private Geometry geometry;
    private Properties properties;
}
