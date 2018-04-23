package edu.pitt.isg.spewmap.web;

import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import edu.pitt.isg.spewmap.geom.GeometryAid;
import edu.pitt.isg.spewmap.BadInput;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static edu.pitt.isg.spewmap.Strings.urlHouseHold;
import static edu.pitt.isg.spewmap.Strings.urlHouseHoldsByBox;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(HouseholdController.class)
@Tag("controller")
public class HouseholdControllerTests {
    @Autowired
    private MockMvc mvc;
    @MockBean
    private GeometryAid aid;
    @MockBean
    private HouseholdRepo mockRepo;

    private final String aHouseholdUrl = urlHouseHold(0L);
    private final String aBoxUrl = urlHouseHoldsByBox(emptyList()) + "0,0,0,0";

    @Test
    @DisplayName("NotFound if the house is not found.")
    void notFoundById() throws Exception {
        given(mockRepo.findById(anyLong())).willReturn(Optional.empty());

        mvc.perform(get(aHouseholdUrl))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Ok if the house is found.")
    void okById() throws Exception {
        final long id = 0L;
        final Household household = newHousehold(id);
        given(mockRepo.findById(anyLong())).willReturn(Optional.of(household));

        mvc.perform(get(aHouseholdUrl))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(id));
    }

    @Test
    @DisplayName("BadRequest if BadInput box.")
    void badRequestByBox() throws Exception {
        given(mockRepo.findAllWithinGeometry(any())).willThrow(BadInput.class);

        mvc.perform(get(aBoxUrl))
                .andExpect(status().isBadRequest());
    }
    @Test
    @DisplayName("Ok if the box is valid.")
    void okByBox() throws Exception {
        final long id = 1L;
        given(mockRepo.findAllWithinGeometry(any()))
                .willReturn(singletonList(newHousehold(id)));

        mvc.perform(get(aBoxUrl))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(id));
    }

    private Household newHousehold(long id) {
        final Household household = new Household();
        household.setId(id);
        return household;
    }
}
