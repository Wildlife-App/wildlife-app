package com.wildlife.app.wildlife.app.validators;

import com.wildlife.app.wildlife.app.exception.ValidationException;
import com.wildlife.app.wildlife.app.models.Tour;
import com.wildlife.app.wildlife.app.repository.TourRepository;
import com.wildlife.app.wildlife.app.util.ErrorConstants;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component("beforeCreateCreateTourRequestValidator")
@AllArgsConstructor
public class CreateTourRequestValidator implements Validator, ErrorConstants {
    private static final Logger LOG = LoggerFactory.getLogger(CreateTourRequestValidator.class);
    private TourRepository tourRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Tour.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        LOG.info("Validating Tour before adding...");
        Tour tour = (Tour) o;
        Optional<Tour> found = tourRepository.findAll().stream().filter(
                foundTour -> isOverlapping(tour, foundTour)).findAny();
        if (found.isPresent()) {
            checkAndThrow(errors, "startDate", OVERLAPPING_TOUR_DATES, "Tour dates overlap with another tour.");
        }

    }

    private void checkAndThrow(Errors errors, String field, String errorCode, String message) {
        errors.rejectValue(field, errorCode, message);
        if (errors.hasErrors()) {
            throw new ValidationException(errors);
        }
    }

    private boolean isOverlapping(Tour oneTour, Tour anotherTour) {
        // Start date of oneTour falls in between anotherTour
        if (oneTour.getStartDate().equals(anotherTour.getStartDate()) ||
                oneTour.getStartDate().equals(anotherTour.getEndDate())) {
            return true;
        }
        if (oneTour.getStartDate().after(anotherTour.getStartDate()) &&
                oneTour.getStartDate().before(anotherTour.getEndDate())) {
            return true;
        }
        // End date of oneTour falls in between anotherTour
        if (oneTour.getEndDate().equals(anotherTour.getStartDate()) ||
                oneTour.getEndDate().equals(anotherTour.getEndDate())) {
            return true;
        }
        if (oneTour.getEndDate().after(anotherTour.getStartDate()) &&
                oneTour.getEndDate().before(anotherTour.getEndDate())) {
            return true;
        }
        // Start date and end date span of oneTour contains the duration of anotherTour
        return (oneTour.getStartDate().before(anotherTour.getStartDate()) &&
                oneTour.getEndDate().after(anotherTour.getEndDate()));
    }

}
