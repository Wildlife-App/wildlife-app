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

import java.sql.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
@AllArgsConstructor
public class TourRequestValidator implements Validator, ErrorConstants {
    private static final Logger LOG = LoggerFactory.getLogger(TourRequestValidator.class);
    private TourRepository tourRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Tour.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        LOG.info("Validating Tour before adding...");
        Tour tour = (Tour) o;

        tour.setCreateDate(new Date(System.currentTimeMillis()));

        List<Tour> allTours = tourRepository.findAll();

        allTours.forEach(anotherTour -> validateDateOverlaps(tour, anotherTour, errors));

        if (tour.getStartDate().after(tour.getEndDate())) {
            checkAndThrow(errors, "startDate", START_DATE_AFTER_END_DATE, "Start date cannot be later than end date");
        }

        int safaris = tour.getSafaris();

        if (safaris < 0) {
            checkAndThrow(errors, "safaris", NEGATIVE_SAFARI_COUNT, "Safari count cannot be negative.");
        }

        if (safaris > 0) {
            long diff = tour.getEndDate().getTime() - tour.getStartDate().getTime();
            long inBetweenDays = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) + 2;
            int maxPossibleSafaris = (int) (inBetweenDays * 2);

            if (safaris > maxPossibleSafaris) {
                checkAndThrow(errors, "safaris", SAFARIS_MORE_THAN_POSSIBLE,
                        String.format("Cannot have more than %s safaris within the range.", maxPossibleSafaris));
            }
        }
    }

    private void checkAndThrow(Errors errors, String field, String errorCode, String message) {
        errors.rejectValue(field, errorCode, message);
        if (errors.hasErrors()) {
            throw new ValidationException(errors);
        }
    }


    private void validateDateOverlaps(Tour oneTour, Tour anotherTour, Errors errors) {
        if(oneTour.equals(anotherTour)) {
            LOG.info("Same tours");
            return;
        }
        // Start date of oneTour falls in between anotherTour
        if (oneTour.getStartDate().equals(anotherTour.getStartDate()) ||
                oneTour.getStartDate().equals(anotherTour.getEndDate())) {
            checkAndThrow(errors, "startDate", OVERLAPPING_TOUR_DATES, "Tour start date overlaps with another tour's start or end date.");
        }
        if (oneTour.getStartDate().after(anotherTour.getStartDate()) &&
                oneTour.getStartDate().before(anotherTour.getEndDate())) {
            checkAndThrow(errors, "startDate", OVERLAPPING_TOUR_DATES, "Tour start date falls in between with another tour.");
        }
        // End date of oneTour falls in between anotherTour
        if (oneTour.getEndDate().equals(anotherTour.getStartDate()) ||
                oneTour.getEndDate().equals(anotherTour.getEndDate())) {
            checkAndThrow(errors, "endDate", OVERLAPPING_TOUR_DATES, "Tour end date overlaps with another tour's start or end date.");
        }
        if (oneTour.getEndDate().after(anotherTour.getStartDate()) &&
                oneTour.getEndDate().before(anotherTour.getEndDate())) {
            checkAndThrow(errors, "endDate", OVERLAPPING_TOUR_DATES, "Tour end date falls in between with another tour.");
        }
        // Start date and end date span of oneTour contains the duration of anotherTour
        if (oneTour.getStartDate().before(anotherTour.getStartDate()) &&
                oneTour.getEndDate().after(anotherTour.getEndDate())) {
            checkAndThrow(errors, "endDate", OVERLAPPING_TOUR_DATES, "Tour span contains another tour dates.");
        }
    }

}
