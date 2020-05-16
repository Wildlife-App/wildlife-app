package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.FoodHabitType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "food-habits", path = "food-habits", exported = false)
public interface FoodHabitTypeRepository extends JpaRepository<FoodHabitType, String> {
    Optional<FoodHabitType> findByFoodHabitType(String foodHabitType);
}
