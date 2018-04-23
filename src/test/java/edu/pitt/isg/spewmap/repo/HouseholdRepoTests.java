package edu.pitt.isg.spewmap.repo;

import edu.pitt.isg.spewmap.spe.Household;
import edu.pitt.isg.spewmap.spe.HouseholdRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(SpringExtension.class)
@DataJpaTest()
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class HouseholdRepoTests {
    @Autowired
    private TestEntityManager em;
    @Autowired
    private HouseholdRepo repo;

    public static final long validHouseholdId = 4353629L;

    @Test
    void integration() {
        final long id = validHouseholdId;

        final Household hh = repo.findById(id).get();

        assertThat(hh.getId()).isEqualTo(id);
    }
}
