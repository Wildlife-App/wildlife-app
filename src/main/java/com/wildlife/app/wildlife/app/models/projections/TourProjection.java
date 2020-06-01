package com.wildlife.app.wildlife.app.models.projections;

import com.wildlife.app.wildlife.app.models.Tour;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.sql.Date;

@Projection(name = "tourExcerpt", types = Tour.class)
public interface TourProjection {
    @Value("#{target.getTourId()}")
    int getResourceId();

    @Value("#{target.getLocation().getLocationName()}")
    String getLocationName();

    @Value("#{target.getLocation().getLocationId()}")
    int getTourLocationId();

    @Value("#{target.getLocation().getState().getStateName()}")
    String getStateName();

    @Value("#{target.getLocation().getState().getCountry().getCountryName()}")
    String getCountryName();

    Date getStartDate();

    Date getEndDate();

    int getSafaris();
}
