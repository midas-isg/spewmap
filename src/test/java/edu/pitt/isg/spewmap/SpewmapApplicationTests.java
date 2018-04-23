package edu.pitt.isg.spewmap;

import edu.pitt.isg.spewmap.spe.Household;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static edu.pitt.isg.spewmap.repo.HouseholdRepoTests.validHouseholdId;
import static edu.pitt.isg.spewmap.Strings.urlHouseHold;
import static edu.pitt.isg.spewmap.Strings.urlHouseHoldsByBox;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpStatus.OK;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class SpewmapApplicationTests {
	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void validHousehold() {
		final long id = validHouseholdId;
		final String validHouseHoldUrl = urlHouseHold(id);

		final ResponseEntity<Household> res = getHousehold(validHouseHoldUrl);

		assertThat(res.getStatusCode()).isEqualTo(OK);
		final Household household = res.getBody();
		assertThat(household.getId()).isEqualTo(id);
		assertValidHousehold(household);
	}

	@Test
	void findHouseholdsByBox() {
		final double e = 1e-3;
		final List<Double> values = asList(-80., 40.45, -80 - e, 40.45 - e);

		final ResponseEntity<Household[]> res = getHouseholdsByBox(values);

		assertThat(res.getStatusCode()).isEqualTo(OK);
		final Household[] households = res.getBody();
		final Household hh = households[0];
		assertThat(hh.getHid()).startsWith("42003563200-");
		assertValidHousehold(hh);
	}

	private void assertValidHousehold(Household household) {
		assertThat(household.getId()).isPositive();
		assertThat(household.getInctot()).isPositive();
		assertThat(household.getPersons()).isPositive();
		assertThat(household.getHid()).isNotBlank();
		assertThat(household.getPoint()).isNotNull();
		assertThat(household.getPuma()).isNotBlank();
	}

	private ResponseEntity<Household[]> getHouseholdsByBox(List<Double> values) {
		final String url = urlHouseHoldsByBox(values);
		return restTemplate.getForEntity(url, Household[].class);
	}

	private ResponseEntity<Household> getHousehold(String url) {
		return restTemplate.getForEntity(url, Household.class);
	}
}
