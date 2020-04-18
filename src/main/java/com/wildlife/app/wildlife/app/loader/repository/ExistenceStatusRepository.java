package com.wildlife.app.wildlife.app.loader.repository;

import com.wildlife.app.wildlife.app.models.db.constants.tables.ExistenceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "existences", path = "existences")
public interface ExistenceStatusRepository extends JpaRepository<ExistenceStatus, String> {
}
