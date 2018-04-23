package edu.pitt.isg.spewmap;

import java.util.List;
import java.util.stream.Collectors;

public class Strings {
    private Strings() {}

    public static final String householdUrl = "/households/";
    public static final String householdBboxUrl = householdUrl + "bbox/";

    public static String urlHouseHold(long id) {
        return householdUrl + id;
    }

    public static String urlHouseHoldsByBox(List<Double> values) {
        final List<String> texts = values.stream()
                .map(Object::toString)
                .collect(Collectors.toList());
        return householdBboxUrl + String.join(",", texts);
    }
}
