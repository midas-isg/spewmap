package edu.pitt.isg.spewmap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.geo.GeoJsonModule;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.WebFilter;

@SpringBootApplication
public class SpewmapApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpewmapApplication.class, args);
	}

	@Bean
	public WebFilter contextPathWebFilter(@Value("${app.server.context-path}") String contextPath) {
		return (exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();
			if (request.getURI().getPath().startsWith(contextPath)) {
				return chain.filter(
						exchange.mutate()
								.request(request.mutate().contextPath(contextPath).build())
								.build());
			}
			return chain.filter(exchange);
		};
	}

	@Bean
	public Jackson2ObjectMapperBuilder jacksonBuilder() {
		final Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
		builder.modulesToInstall(new GeoJsonModule());
		return builder;
	}
}