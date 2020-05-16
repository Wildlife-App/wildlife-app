package com.wildlife.app.wildlife.app.models.projections;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.wildlife.app.wildlife.app.models.constants.tables.State;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "excerpt", types = State.class)
public interface StateProjection {
    @Value("#{target.getStateCode()}")
    String getNationalStateCode();

    String getStateName();

    @JsonBackReference
    CountryProjection getCountry();
}
