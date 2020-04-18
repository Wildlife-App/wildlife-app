package com.wildlife.app.wildlife.app.exception;

public class NoSuchPropertyException extends RuntimeException {
    public NoSuchPropertyException(String property, String input) {
        super(String.format("%s %s does not exist.",property, input));
    }
}
