package edu.pitt.isg.spewmap.geom;

import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class FeatureCollection {
    public static final String TYPE = "FeatureCollection";

    private final String type = TYPE;
    private List<Feature> features;
    private final Map<String, Object> properties = new HashMap<>();
}
