package com.wildlife.app.wildlife.app.validators;

import com.wildlife.app.wildlife.app.exception.ValidationException;
import com.wildlife.app.wildlife.app.models.Location;
import com.wildlife.app.wildlife.app.models.constants.tables.State;
import com.wildlife.app.wildlife.app.repository.LocationRepository;
import com.wildlife.app.wildlife.app.repository.StateRepository;
import com.wildlife.app.wildlife.app.util.ErrorConstants;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.sql.Date;
import java.util.concurrent.atomic.AtomicBoolean;

@Component("beforeCreateCreateLocationRequestValidator")
@AllArgsConstructor
public class CreateLocationRequestValidator implements Validator, ErrorConstants {
    private static final Logger LOG = LoggerFactory.getLogger(CreateLocationRequestValidator.class);
    private LocationRepository locationRepository;
    private StateRepository stateRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Location.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        LOG.info("Validating location before adding...");
        Location location = (Location) o;

        location.setCreateDate(new Date(System.currentTimeMillis()));

        String locationName = location.getLocationName();

        if (StringUtils.isEmpty(locationName)) {
            checkAndThrow(errors, "locationName", EMPTY_LOCATION,
                    "Location name cannot be empty.");
        }
        if (locationName.length() < 3) {
            checkAndThrow(errors, "locationName", LOCATION_MIN_LENGTH,
                    "Must contain minimum 3 characters.");
        }

        if (locationName.length() > 50) {
            checkAndThrow(errors, "locationName", LOCATION_MAX_LENGTH,
                    "Can contain maximum 50 characters.");
        }

        if (Character.isDigit(locationName.charAt(0))) {
            checkAndThrow(errors, "locationName", LOCATION_NAME_STARTS_WITH_NUMBER,
                    "Cannot start with a number.");
        }

        if (isInvalidNameString(locationName)) {
            checkAndThrow(errors, "locationName", LOCATION_NAME_CONTAINS_INVALID_CHAR,
                    "Cannot contain any special character.");
        }

        State state = location.getState();

        if (StringUtils.isEmpty(state.getStateCode())) {
            checkAndThrow(errors, "state", EMPTY_STATE,
                    "Empty State.");
        }

        if (isInvalidNameString(state.getStateCode())) {
            checkAndThrow(errors, "state", INVALID_STATE,
                    "Invalid State.");
        }

        if (location.getArea() < 0) {
            checkAndThrow(errors, "area", NEGATIVE_AREA,
                    "Area cannot be negative.");
        }

        if (locationRepository.findByLocationName(location.getLocationName()).isPresent()) {
            checkAndThrow(errors, "locationName", DUPLICATE_LOCATION,
                    String.format("%s already exists in our record.", location.getLocationName()));
        }

        if (!stateRepository.findById(state.getStateCode()).isPresent()) {
            checkAndThrow(errors, "state", INVALID_STATE,
                    "Invalid State.");
        }
    }

    private void checkAndThrow(Errors errors, String field, String errorCode, String message) {
        errors.rejectValue(field, errorCode, message);
        if (errors.hasErrors()) {
            throw new ValidationException(errors);
        }
    }

    private boolean isInvalidNameString(String name) {
        AtomicBoolean isValid = new AtomicBoolean(false);
        name.chars().forEach(c -> {
            if (INVALID_CHARS_LIST.contains((char) c)) {
                isValid.set(true);
            }
        });
        return isValid.get();
    }
}
