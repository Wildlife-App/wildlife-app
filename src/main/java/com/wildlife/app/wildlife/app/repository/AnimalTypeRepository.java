package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "animalType", path = "animalType")
public interface AnimalTypeRepository extends JpaRepository<AnimalType, String> {
    Optional<AnimalType> findByAnimalTypeName(String animalType);
}
