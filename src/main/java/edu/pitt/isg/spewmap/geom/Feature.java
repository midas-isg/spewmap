package edu.pitt.isg.spewmap.geom;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
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
        point.put("type", "Point");
        point.put("coordinates", toCoordinates());
        return point;
    }

    private List<Double> toCoordinates() {
        final Geometry geometry = getGeometry();
        if (geometry == null)
            return null;
        final Coordinate coordinate = geometry.getCoordinate();
        return asList(coordinate.x, coordinate.y);
    }

    public Map<String, Object> featurePoint2d(){
        final Map<String, Object> feature = new HashMap<>();
        feature.put("type", getType());
        feature.put("geometry", point2d());
        feature.put("properties", getProperties());
        return feature;
    }
}
