package com.wildlife.app.wildlife.app.exception;

public class NoSuchAnimalException extends RuntimeException {
    public NoSuchAnimalException(String str) {
        super(String.format("Animal with name or scientific name %s does not exist.", str));
    }
}
