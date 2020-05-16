package com.wildlife.app.wildlife.app.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ExceptionHandlerAdvice {
    private static final Logger LOG = LoggerFactory.getLogger(ExceptionHandlerAdvice.class);

    @ExceptionHandler(value = ValidationException.class)
    public ResponseEntity<Object> handleError(ValidationException e) {
        Errors errors = e.getErrors();
        List<ObjectError> allErrors = errors.getAllErrors();
        LOG.error("Error handling - {}", allErrors);
        ErrorModel errorModel = new ErrorModel();
        allErrors.forEach(error -> {
            FieldError fieldError = (FieldError) error;
            errorModel.addMessage(fieldError.getField(), error.getDefaultMessage());
        });
        return new ResponseEntity<>(errorModel, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

