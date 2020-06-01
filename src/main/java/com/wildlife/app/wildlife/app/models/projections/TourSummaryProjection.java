package com.wildlife.app.wildlife.app.models.projections;

import com.wildlife.app.wildlife.app.models.Tour;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "tourSummary", types = Tour.class)
public interface TourSummaryProjection {
    @Value("#{target.location.locationName}")
    String getLocationName();
    
    @Value("#{target.location.locationId}")
    int getLocationId();
}
