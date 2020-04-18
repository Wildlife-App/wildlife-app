package com.wildlife.app.wildlife.app.transformer;

import com.wildlife.app.wildlife.app.exception.NoSuchCountryException;
import com.wildlife.app.wildlife.app.exception.NoSuchPropertyException;
import com.wildlife.app.wildlife.app.exception.NoSuchStateException;
import com.wildlife.app.wildlife.app.models.db.Animal;
import com.wildlife.app.wildlife.app.models.db.AnimalOtherName;
import com.wildlife.app.wildlife.app.models.db.Location;
import com.wildlife.app.wildlife.app.models.db.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.db.constants.tables.Country;
import com.wildlife.app.wildlife.app.models.db.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.db.constants.tables.FoodHabitType;
import com.wildlife.app.wildlife.app.models.db.constants.tables.State;
import com.wildlife.app.wildlife.app.models.json.AnimalJson;
import com.wildlife.app.wildlife.app.models.json.LocationJson;
import com.wildlife.app.wildlife.app.repository.LocationRepository;
import com.wildlife.app.wildlife.app.util.AppUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ModelTransformer {
    private List<AnimalType> animalTypes;
    private List<FoodHabitType> foodHabitTypes;
    private List<ExistenceStatus> existenceStatuses;
    private List<Country> countries;
    private List<State> states;

    private LocationRepository locationRepository;

    public Animal animalJsonToAnimal(AnimalJson animalJson) {
        Animal animal = Animal.builder()
                .animalId(tableId("ANIM"))
                .animalName(AppUtil.titleCase(animalJson.getAnimalName()))
                .animalOtherNames(null)
                .scientificName(animalJson.getScientificName())
                .foodHabitType(foodHabitStringToFoodHabitType(animalJson.getFoodHabit()))
                .animalType(animalTypeStringToAnimalType(animalJson.getAnimalType()))
                .spottingLocations(animalJson.getSpottingLocations() == null ? null
                        : locationJsonListToLocationList(animalJson.getSpottingLocations()))
                .existenceStatus(existenceStatusStringToExistenceStatus(animalJson.getExistenceStatus()))
                .build();

        animal.setAnimalOtherNames(animalJson.getOtherNames() == null ? null : animalJson.getOtherNames()
                .stream()
                .map(name -> fromName(animalJson.getAnimalId(), name))
                .collect(Collectors.toSet()));
        return animal;
    }
    public AnimalJson animalToAnimalJson(Animal animal) {
        return AnimalJson.builder()
                .animalId(animal.getAnimalId())
                .animalName(animal.getAnimalName())
                .scientificName(animal.getScientificName())
                .animalType(animal.getAnimalType().getAnimalTypeName())
                .foodHabit(animal.getFoodHabitType().getFoodHabitType())
                .spottingLocations(animal.getSpottingLocations() == null ? null
                        : locationListToLocationJsonList(animal.getSpottingLocations()))
                .otherNames(animal.getAnimalOtherNames() == null ? null : animal.getAnimalOtherNames()
                        .stream()
                        .map(AnimalOtherName::getAnimalOtherName)
                        .collect(Collectors.toList()))
                .spottingLocations(animal.getSpottingLocations() == null ? null
                        : locationListToLocationJsonList(animal.getSpottingLocations()))
                .firstSpottingDate(animal.getFirstSpottingDate())
                .build();
    }

    private AnimalOtherName fromName(String animalId, String name) {
        return AnimalOtherName.builder()
                .animalOtherNameId(tableId("ANIO"))
                .animalOtherName(name)
                .animalId(animalId)
                .build();
    }

    private FoodHabitType foodHabitStringToFoodHabitType(String foodHabitString) {
        return foodHabitTypes.stream()
                .filter(habit -> habit.getFoodHabitType().equalsIgnoreCase(foodHabitString))
                .findFirst()
                .orElseThrow(() -> new NoSuchPropertyException("Food habit", foodHabitString));
    }

    private AnimalType animalTypeStringToAnimalType(String animalTypeString) {
        return animalTypes.stream()
                .filter(type -> type.getAnimalTypeName().equalsIgnoreCase(animalTypeString))
                .findFirst()
                .orElseThrow(() -> new NoSuchPropertyException("Animal Type", animalTypeString));
    }

    private ExistenceStatus existenceStatusStringToExistenceStatus(String existenceStatusString) {
        return existenceStatuses.stream()
                .filter(existenceStatus -> existenceStatus.getExistenceStatus().equalsIgnoreCase(existenceStatusString))
                .findFirst()
                .orElseThrow(() -> new NoSuchPropertyException("Existence Status", existenceStatusString));
    }

    public Location locationJsonToLocation(LocationJson locationJson) {
        return locationRepository.findByLocationName(locationJson.getLocationName())
                .orElseGet(() -> Location.builder()
                        .locationId(tableId("LOC"))
                        .locationName(locationJson.getLocationName())
                        .state(states.stream()
                                .filter(state -> state.getStateName().equalsIgnoreCase(locationJson.getState()))
                                .findFirst()
                                .orElseThrow(() -> new NoSuchStateException(locationJson.getState())))
                        .area(locationJson.getArea())
                        .build());

    }

    public LocationJson locationToLocationJson(Location location) {
        return LocationJson.builder()
                .locationId(location.getLocationId())
                .locationName(location.getLocationName())
                .state(location.getState().getStateName())
                .country(countries.stream()
                        .filter(country -> country.getCountryCode().equals(location.getState().getCountryCode()))
                        .findFirst()
                        .orElseThrow(() -> new NoSuchCountryException(location.getState().getCountryCode()))
                        .getCountryName())
                .area(location.getArea() == null ? 0 : location.getArea())
                .build();
    }

    public List<Location> locationJsonListToLocationList(List<LocationJson> locationJsonList) {
        return locationJsonList.stream().map(this::locationJsonToLocation).collect(Collectors.toList());
    }

    public List<LocationJson> locationListToLocationJsonList(List<Location> locationList) {
        return locationList.stream().map(this::locationToLocationJson).collect(Collectors.toList());
    }

    private String tableId(String prefix) {
        return String.format("%s%s", prefix, AppUtil.generateId());
    }
}
