package com.wildlife.app.wildlife.app.loader.repository;

import com.wildlife.app.wildlife.app.models.db.constants.tables.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "animal-type", path = "animal-type")
public interface AnimalTypeRepository extends JpaRepository<AnimalType, String> {
    Optional<AnimalType> findByAnimalTypeName(String animalType);
}
