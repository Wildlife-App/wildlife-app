package com.wildlife.app.wildlife.app.summary;

import com.wildlife.app.wildlife.app.models.Tour;
import com.wildlife.app.wildlife.app.repository.TourRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wildlife/v1/summary")
@AllArgsConstructor
public class SummaryRestController {
    private static final DateFormat yearExtractor = new SimpleDateFormat("yyyy");
    private TourRepository tourRepository;

    @GetMapping
    public ResponseEntity<Object> loadSummary(@RequestParam(name = "groupBy", required = false) String groupByValue) {
        List<Tour> allTours = tourRepository.findAll();

        SummaryRestResponse response = new SummaryRestResponse();
        SummaryGroup groupBy = SummaryGroup.fromValue(groupByValue);
        response.setTotalTours(allTours.size());
        response.setGroupBy(groupBy.toString());
        groupTours(response, allTours, groupBy);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void groupTours(SummaryRestResponse response, List<Tour> allTours, SummaryGroup groupBy) {
        List<SummaryRestModel> summaries = new ArrayList<>();
        allTours.forEach(tour -> {
            String groupByValue = resolveGroupByValue(tour, groupBy);

            Optional<SummaryRestModel> foundSummary = summaries.stream()
                    .filter(summary -> groupByValue.equals(summary.getGroupByValue()))
                    .findFirst();

            if (foundSummary.isPresent()) {
                SummaryRestModel summary = foundSummary.get();
                summary.getTours().add(tour);
                summary.setTourCount(summary.getTourCount() + 1);
                summary.setLabel(getLabel(groupBy, true));
            } else {
                List<Tour> tours = new ArrayList<>();
                tours.add(tour);
                summaries.add(SummaryRestModel.builder()
                        .groupByValue(groupByValue)
                        .tours(tours)
                        .tourCount(1)
                        .label(getLabel(groupBy, false))
                        .build());
            }
        });
        response.setSummaries(summaries);
    }

    private String resolveGroupByValue(Tour tour, SummaryGroup group) {
        switch (group) {
            case YEAR_OF_TOUR:
                return yearExtractor.format(tour.getStartDate());
            case LOCATION_NAME:
            case DEFAULT:
            default:
                return tour.getLocation().getLocationName();
        }
    }

    private String getLabel(SummaryGroup group, boolean multi) {
        switch (group) {
            case YEAR_OF_TOUR:
                return String.format("Tour%s in the year ", (multi ? "s" : ""));
            case LOCATION_NAME:
            case DEFAULT:
            default:
                return String.format("Tour%s to ", (multi ? "s" : ""));
        }
    }
}
