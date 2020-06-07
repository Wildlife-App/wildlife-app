package com.wildlife.app.wildlife.app.models.projections;

import com.wildlife.app.wildlife.app.models.Animal;
import com.wildlife.app.wildlife.app.models.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.constants.tables.FoodHabitType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "animalProjection", types = Animal.class)
public interface AnimalProjection {
    @Value("#{target.animalId}")
    int getResourceId();

    String getAnimalName();

    String getScientificName();

    String getAnimalGender();

    AnimalType getAnimalType();

    ExistenceStatus getExistenceStatus();

    FoodHabitType getFoodHabitType();
}
