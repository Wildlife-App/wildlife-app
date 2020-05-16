package com.wildlife.app.wildlife.app.init;

import com.wildlife.app.wildlife.app.events.ValidationMessagesEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EventConfig {
    @Bean
    public ValidationMessagesEvent validationMessagesEvent() {
        return new ValidationMessagesEvent();
    }
}
