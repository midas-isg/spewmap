package edu.pitt.isg.spewmap;

import com.bedatadriven.jackson.datatype.jts.JtsModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
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
