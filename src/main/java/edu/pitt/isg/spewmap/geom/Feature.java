package edu.pitt.isg.spewmap.geom;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;

@Data
public class Feature {
    public static final String TYPE = "Feature";

    private String type = TYPE;
    private Geometry geometry;
    private Properties properties;

    private Map<String, Object> point2d() {
        final Map<String, Object> point = new HashMap<>();
        final Coordinate coordinates = geometry.getCoordinate();
        point.put("type", "Point");
        point.put("coordinates", asList(coordinates.x, coordinates.y));
        return point;
    }

    public Map<String, Object> featurePoint2d(){
        final Map<String, Object> feature = new HashMap<>();
        feature.put("type", getType());
        feature.put("geometry", point2d());
        feature.put("properties", getProperties());
        return feature;
    }
}
