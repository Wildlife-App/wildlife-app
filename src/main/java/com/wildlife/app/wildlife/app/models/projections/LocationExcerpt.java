package com.wildlife.app.wildlife.app.models.projections;

import com.wildlife.app.wildlife.app.models.Location;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "locationExcerpt", types = Location.class)
public interface LocationExcerpt {
    String getResourceId();
    String getLocationName();
    Double getArea();
    StateProjection getState();
}
