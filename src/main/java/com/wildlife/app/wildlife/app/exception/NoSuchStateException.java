package com.wildlife.app.wildlife.app.exception;

public class NoSuchStateException extends RuntimeException {
    public NoSuchStateException(String state) {
        super(String.format("State with name %s does not exist.", state));
    }
}
