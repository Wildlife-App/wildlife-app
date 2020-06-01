package com.wildlife.app.wildlife.app.models.projections;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wildlife.app.wildlife.app.models.Location;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "locationExcerpt", types = Location.class)
public interface LocationProjection extends Comparable<LocationProjection> {
    @Value("#{target.locationId}")
    String getResourceId();

    String getLocationName();

    Double getArea();

    StateProjection getState();

    List<TourProjection> getTours();

}
