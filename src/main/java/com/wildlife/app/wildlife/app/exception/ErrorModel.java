package com.wildlife.app.wildlife.app.exception;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
class ErrorModel {
    ErrorModel() {
        this.errorMessages = new HashMap<>();
    }
    private Map<String, List<String>> errorMessages;

    void addMessage(String field, String message) {
        if(errorMessages.containsKey(field)) {
            errorMessages.get(field).add(message);
        } else {
            List<String> messageList = new ArrayList<>();
            messageList.add(message);
            errorMessages.put(field, messageList);
        }
    }
}
