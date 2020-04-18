package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.db.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {
    Optional<Animal> findByAnimalName(String animalName);
    Optional<Animal> findByScientificName(String scientificName);
    List<Animal> findAllByAnimalNameIsLikeOrScientificNameIsLike(String searchString1, String searchString2);
}
