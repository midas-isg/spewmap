package edu.pitt.isg.spewmap.geom;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import edu.pitt.isg.spewmap.BadInput;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@Tag("fast")
@ExtendWith(MockitoExtension.class)
class GeometryAidTests {
    @Mock
    private GeometryAid mock;

    @Test
    void boxPolygon() throws Exception {
        given(mock.wktToGeometry(any())).willCallRealMethod();

        final Geometry box = actBoxPolygon();

        assertThat(box.getGeometryType()).isEqualToIgnoringCase("Polygon");
    }

    @Test
    void boxPolygonWithParseException() throws Exception {
        final Class<ParseException> cause = ParseException.class;
        given(mock.wktToGeometry(any())).willThrow(cause);

        assertThatCode(this::actBoxPolygon)
                .isInstanceOf(BadInput.class)
                .hasMessage("Could not create a valid box from:[1.0, 2.0, 3.0, 4.0]")
                .hasCauseInstanceOf(cause);
    }

    private Geometry actBoxPolygon() {
        given(mock.boxPolygon(1., 2., 3., 4.)).willCallRealMethod();
        return mock.boxPolygon(1., 2., 3., 4.);
    }
}