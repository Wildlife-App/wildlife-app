package com.wildlife.app.wildlife.app.exception;

public class NoSuchCountryException extends RuntimeException {
    public NoSuchCountryException(String country) {
        super(String.format("Country with name %s does not exist.", country));
    }
}
