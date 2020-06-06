package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.Country;
import com.wildlife.app.wildlife.app.models.projections.CountryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "countries",
        path = "countries",
        excerptProjection = CountryProjection.class, exported = false)
public interface CountryRepository extends JpaRepository<Country, String> {
}
