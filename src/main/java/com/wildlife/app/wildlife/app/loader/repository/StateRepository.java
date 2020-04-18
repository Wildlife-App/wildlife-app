package com.wildlife.app.wildlife.app.loader.repository;

import com.wildlife.app.wildlife.app.models.db.constants.tables.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "states", path = "states")
public interface StateRepository extends JpaRepository<State, String> {
    Optional<State> findByStateName(String stateCode);
}
