package com.wildlife.app.wildlife.app.exception;

public class AppLoadingException extends RuntimeException {
    private static final long serialVersionUID = -981952923489234L;

    public AppLoadingException(String message) {
        super(message);
    }
    public AppLoadingException(Throwable cause) {
        super(cause);
    }
}
