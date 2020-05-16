package com.wildlife.app.wildlife.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.wildlife")
@EnableJpaRepositories(basePackages = {"com.wildlife.app.wildlife.app.repository",
        "com.wildlife.app.wildlife.app.repository"})
@EntityScan(basePackages = "com.wildlife.app.wildlife.app.models")
public class WildlifeAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(WildlifeAppApplication.class, args);
    }

}
