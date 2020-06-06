package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.ExistenceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "existences", path = "existences", exported = false)
public interface ExistenceStatusRepository extends JpaRepository<ExistenceStatus, String> {
}
