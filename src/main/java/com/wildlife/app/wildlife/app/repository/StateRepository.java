package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.State;
import com.wildlife.app.wildlife.app.models.projections.StateProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "states",
        path = "states",
        excerptProjection = StateProjection.class, exported = false)
public interface StateRepository extends JpaRepository<State, String> {
}
