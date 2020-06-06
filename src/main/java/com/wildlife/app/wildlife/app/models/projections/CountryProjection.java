package com.wildlife.app.wildlife.app.models.projections;

import com.wildlife.app.wildlife.app.models.constants.tables.Country;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "excerpt", types = Country.class)
public interface CountryProjection {
    @Value("#{target.getCountryCode()}")
    String getInternationalCode();

    String getCountryName();
}
