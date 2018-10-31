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

    /*@Bean
    public Jackson2ObjectMapperBuilder objectMapperBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.modulesToInstall(new JtsModule());
        return builder;
    }*/
}
/*
@Configuration
class WebConfig extends SpringDataWebConfiguration {
    public WebConfig(ApplicationContext context, ObjectFactory<ConversionService> conversionService) {
        super(context, conversionService);
    }

    @Bean
    @Override
    public PageableHandlerMethodArgumentResolver pageableResolver() {
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver(sortResolver());
        resolver.setOneIndexedParameters(true);
        resolver.setMaxPageSize(Integer.MAX_VALUE);
        return resolver;
    }
}*/