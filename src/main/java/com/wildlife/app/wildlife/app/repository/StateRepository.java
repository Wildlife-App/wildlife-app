package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.Country;
import com.wildlife.app.wildlife.app.models.constants.tables.State;
import com.wildlife.app.wildlife.app.models.projections.StateProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "states",
        path = "states",
        excerptProjection = StateProjection.class)
public interface StateRepository extends JpaRepository<State, String> {
    List<State> findAllByCountry(Country country);
}
