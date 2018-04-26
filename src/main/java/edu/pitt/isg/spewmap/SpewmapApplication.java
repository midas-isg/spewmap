package edu.pitt.isg.spewmap;

import com.bedatadriven.jackson.datatype.jts.JtsModule;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.config.SpringDataWebConfiguration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@SpringBootApplication
public class SpewmapApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpewmapApplication.class, args);
	}

    @Bean
    public Jackson2ObjectMapperBuilder objectMapperBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.modulesToInstall(new JtsModule());
        return builder;
    }
}

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
}