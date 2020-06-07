package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "animals", path = "animals")
public interface AnimalRepository extends JpaRepository<Animal, Integer> {
    Optional<Animal> findByAnimalName(String animalName);
    Optional<Animal> findByScientificName(String scientificName);
}
