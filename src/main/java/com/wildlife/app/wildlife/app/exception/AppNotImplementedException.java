package com.wildlife.app.wildlife.app.exception;

public class AppNotImplementedException extends RuntimeException {
    private static final long serialVersionUID = -981952923489234L;

    private AppNotImplementedException(String message) {
        super(message);
    }

    public static AppNotImplementedException notImplemented() {
        return new AppNotImplementedException("This method is not implemented yet.");
    }
}
