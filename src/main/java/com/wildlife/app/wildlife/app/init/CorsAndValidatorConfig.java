package com.wildlife.app.wildlife.app.init;

import com.wildlife.app.wildlife.app.validators.CreateAnimalRequestValidator;
import com.wildlife.app.wildlife.app.validators.TourRequestValidator;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class CorsAndValidatorConfig implements RepositoryRestConfigurer {
	private TourRequestValidator tourRequestValidator;
	private CreateAnimalRequestValidator createAnimalRequestValidator;
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*");
			}
		};
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		System.out.println("Configuring CORS......");
		config.getCorsRegistry().addMapping("/**")
				.allowedOrigins("http://localhost:4200")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
	}

	@Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		validatingListener.addValidator("beforeCreate", this.tourRequestValidator);
		validatingListener.addValidator("beforeSave", this.tourRequestValidator);
		validatingListener.addValidator("beforeCreate", this.createAnimalRequestValidator);
	}
}
