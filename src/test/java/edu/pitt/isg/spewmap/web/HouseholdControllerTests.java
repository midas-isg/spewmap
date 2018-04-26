package edu.pitt.isg.spewmap.web;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;
import edu.pitt.isg.spewmap.BadInput;
import edu.pitt.isg.spewmap.geom.Feature;
import edu.pitt.isg.spewmap.geom.FeatureCollection;
import edu.pitt.isg.spewmap.geom.GeometryAid;
import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static com.bedatadriven.jackson.datatype.jts.GeoJson.POINT;
import static com.bedatadriven.jackson.datatype.jts.GeoJson.TYPE;
import static edu.pitt.isg.spewmap.Strings.urlHouseHold;
import static edu.pitt.isg.spewmap.Strings.urlHouseHoldsByBox;
import static edu.pitt.isg.spewmap.geom.GeometryAid.GEOJSON;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(HouseholdController.class)
@Tag("controller")
public class HouseholdControllerTests {
    private static final String GEOJSON_UTF8 = GEOJSON + ";charset=UTF-8";
    private static final String JSON_UTF8 = APPLICATION_JSON + ";charset=UTF-8";

    @Autowired
    private MockMvc mvc;
    @MockBean
    private GeometryAid aid;
    @MockBean
    private HouseholdRepo mockRepo;

    private final long ID = 0L;
    private final String aHouseholdUrl = urlHouseHold(ID);
    private final String aBoxUrl = urlHouseHoldsByBox(emptyList()) + "0,0,0,0";
    private final double X = 1.;
    private final double Y = 2.;

    @Test @DisplayName("NotFound if the house is not found.")
    void notFoundById() throws Exception {
        given(mockRepo.findById(anyLong())).willReturn(Optional.empty());

        mvc.perform(get(aHouseholdUrl))
                .andExpect(status().isNotFound());
    }

    @Test @DisplayName("Ok as Json if the house is found.")
    void okAsJsonById() throws Exception {
        givenHouseholdIsAvailable();

        mvc.perform(get(aHouseholdUrl).header(ACCEPT, APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string(CONTENT_TYPE, JSON_UTF8))
                .andExpect(jsonPath("id").value(ID))
                .andExpect(jsonPath("point.type").value(POINT))
                .andExpect(jsonPath("point.coordinates[0]").value(X))
                .andExpect(jsonPath("point.coordinates[1]").value(Y));
    }

    @Test @DisplayName("Ok as GeoJson if the house is found.")
    void okAsGeoJsonById() throws Exception {
        givenHouseholdIsAvailable();
        givenAidWillCallRealMetods();

        mvc.perform(get(aHouseholdUrl).header(ACCEPT, GEOJSON))
                .andExpect(status().isOk())
                .andExpect(header().string(CONTENT_TYPE, GEOJSON_UTF8))
                .andExpect(jsonPath(TYPE).value(Feature.TYPE))
                .andExpect(jsonPath("geometry." + TYPE).value(POINT))
                .andExpect(jsonPath("geometry.coordinates[0]").value(X))
                .andExpect(jsonPath("geometry.coordinates[1]").value(Y))
                .andReturn();
    }

    @Test @DisplayName("BadRequest if BadInput box.")
    void badRequestByBox() throws Exception {
        given(mockRepo.findWithinGeometry(any(), any())).willThrow(BadInput.class);

        mvc.perform(get(aBoxUrl))
                .andExpect(status().isBadRequest());
    }

    @Test @DisplayName("Ok as Json if the box is valid.")
    void okByBox() throws Exception {
        final long id = 100L;
        givenBboxReturnHouseWithId(id);

        mvc.perform(get(aBoxUrl).header(ACCEPT, APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string(CONTENT_TYPE, JSON_UTF8))
                .andExpect(jsonPath("$[0].id").value(id));
    }

    private void givenBboxReturnHouseWithId(long id) {
        /*new Page<Household>();
        given(mockRepo.findWithinGeometry(any(), any()))
                .willReturn(singletonList(newHousehold(id)));*/
    }

    @Test @DisplayName("Ok as GeoJson if the box is valid.")
    void okAsGeoJsonByBox() throws Exception {
        final long id = 200L;
        givenBboxReturnHouseWithId(id);
        givenAidWillCallRealMetods();

        mvc.perform(get(aBoxUrl).header(ACCEPT, GEOJSON))
                .andExpect(status().isOk())
                .andExpect(header().string(CONTENT_TYPE, GEOJSON_UTF8))
                .andExpect(jsonPath(TYPE).value(FeatureCollection.TYPE))
                .andExpect(jsonPath("properties.ext").value("test"))
                .andExpect(jsonPath("features[0]." + TYPE).value(Feature.TYPE))
                .andExpect(jsonPath("features[0].properties.id").value(id))
                .andReturn();
    }

    private void givenHouseholdIsAvailable() {
        final Household household = newHousehold(ID);
        final Point point = newPoint(X, Y);
        household.setPoint(point);
        given(mockRepo.findById(anyLong())).willReturn(Optional.of(household));
    }

    private void givenAidWillCallRealMetods() {
        given(aid.toFeatureCollection(any())).willCallRealMethod();
        given(aid.toFeature(any())).willCallRealMethod();
    }

    private Point newPoint(double x, double y) {
        final Coordinate coordinate = new Coordinate(x, y);
        final GeometryFactory fact = new GeometryFactory();
        return fact.createPoint(coordinate);
    }

    private Household newHousehold(long id) {
        final Household household = new Household();
        household.setId(id);
        return household;
    }
}
