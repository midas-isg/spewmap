package edu.pitt.isg.spewmap.geom;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import edu.pitt.isg.spewmap.BadInput;
import edu.pitt.isg.spewmap.spe.Household;
import lombok.RequiredArgsConstructor;
import org.assertj.core.util.VisibleForTesting;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class GeometryAid {
    public static final String GEOJSON = "application/geo+json";

    public Feature toFeature(Household hh) {
        final Feature f = new Feature();
        f.setGeometry(hh.getPoint());
        hh.setPoint(null);
        f.setProperties(hh);
        return f;
    }

    public FeatureCollection toFeatureCollection(List<Household> hhs) {
        final List<Feature> fs= hhs.stream()
                .map(this::toFeature)
                .collect(toList());
        final FeatureCollection fc = new FeatureCollection();
        fc.setFeatures(fs);
        fc.getProperties().put("ext", "test");
        return fc;
    }

    public Geometry boxPolygon(double x1, double y1, double x2, double y2) {
         final String wkt = boxWkt(x1, y1, x2, y2);
        try {
            return wktToGeometry(wkt);
        } catch (ParseException e) {
            throw new BadInput("Could not create a valid box from:"
                    + asList(x1, y1, x2, y2), e);
        }
    }

    @RequiredArgsConstructor
    private static class Point2D {
        final double x;
        final double y;

        @Override
        public String toString() {
            return x + " " + y;
        }
    }

    private String boxWkt(double x1, double y1, double x2, double y2) {
        final Point2D p1 = new Point2D(x1, y1);
        final Point2D p2 = new Point2D(x1, y2);
        final Point2D p3 = new Point2D(x2, y2);
        final Point2D p4 = new Point2D(x2, y1);
        return format("POLYGON((%s, %s, %s, %s, %s))", p1, p2, p3, p4, p1);
    }

    @VisibleForTesting
    public Geometry wktToGeometry(String wkt) throws ParseException {
        return new WKTReader().read(wkt);
    }
}
