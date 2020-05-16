package com.wildlife.app.wildlife.app.exception;

import org.springframework.validation.Errors;

public class ValidationException extends RuntimeException {
    private static final long serialVersionUID = -1928912900430191L;

    private final Errors errors;

    public ValidationException(Errors errors) {
        this.errors = errors;
    }

    public Errors getErrors() {
        return errors;
    }
}
