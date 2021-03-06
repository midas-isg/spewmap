package edu.pitt.isg.spewmap;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class SpewmapApplicationTests {
	@Autowired
	private TestRestTemplate restTemplate;

	/*@Test
	void validHousehold() {
		final String id = "4353629L";
		final String validHouseHoldUrl = urlHouseHold(id);

		final ResponseEntity<Household> res = getHousehold(validHouseHoldUrl);

		assertThat(res.getStatusCode()).isEqualTo(OK);
		final Household household = res.getBody();
		assertThat(household.getHid()).isEqualTo(id);
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
		assertThat(household.getHid()).isNotBlank();
		assertThat(household.getIncome()).isPositive();
		assertThat(household.getPersons()).isPositive();
		assertThat(household.getHid()).isNotBlank();
		assertThat(household.getPoint()).isNotNull();
		assertThat(household.getPuma()).isNotBlank();
	}

	private ResponseEntity<Household[]> getHouseholdsByBox(List<Double> values) {
		final String url = urlHouseHoldsByBox(values);
		final HttpEntity<Household[]> entity = new HttpEntity<>(httpHeaders());
		return restTemplate.exchange(url, GET, entity, Household[].class);
	}

	private ResponseEntity<Household> getHousehold(String url) {
		final HttpEntity<Household> entity = new HttpEntity<>(httpHeaders());
		return restTemplate.exchange(url, GET, entity, Household.class);
	}

	private HttpHeaders httpHeaders() {
		final HttpHeaders headers = new HttpHeaders();
		headers.setAccept(singletonList(MediaType.APPLICATION_JSON));
		return headers;
	}*/
}
