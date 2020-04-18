package com.wildlife.app.wildlife.app.service;

import com.wildlife.app.wildlife.app.exception.NoSuchAnimalException;
import com.wildlife.app.wildlife.app.models.db.Animal;
import com.wildlife.app.wildlife.app.models.json.AnimalJson;
import com.wildlife.app.wildlife.app.models.json.LocationJson;
import com.wildlife.app.wildlife.app.repository.AnimalRepository;
import com.wildlife.app.wildlife.app.repository.LocationRepository;
import com.wildlife.app.wildlife.app.transformer.ModelTransformer;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class WildlifeService {
    private static final Logger LOG = LoggerFactory.getLogger(WildlifeService.class);

    private ModelTransformer modelTransformer;
    private AnimalRepository animalRepository;
    private LocationRepository locationRepository;

    public AnimalJson addAnimal(AnimalJson animalJson) {
        Animal toAdd = modelTransformer.animalJsonToAnimal(animalJson);
        toAdd.setFirstSpottingDate(new Date());
        return modelTransformer.animalToAnimalJson(animalRepository.save(toAdd));
    }

    public List<AnimalJson> allAnimals() {
        return animalRepository.findAll()
                .stream()
                .map(modelTransformer::animalToAnimalJson)
                .collect(Collectors.toList());
    }

    public List<AnimalJson> searchAnimal(String searchString) {
        String wildcardSearch = "%" + searchString + "%";
        LOG.info("Searching with - {}", wildcardSearch);
        return animalRepository.findAllByAnimalNameIsLikeOrScientificNameIsLike(wildcardSearch, wildcardSearch)
                .stream()
                .map(modelTransformer::animalToAnimalJson)
                .collect(Collectors.toList());
    }

    public AnimalJson findAnimalById(String animalId) {
        return modelTransformer.animalToAnimalJson(animalRepository.findById(animalId)
                .orElseThrow(() -> new NoSuchAnimalException(animalId)));
    }

    public AnimalJson findAnimalByName(String animalName) {
        return modelTransformer.animalToAnimalJson(animalRepository.findByAnimalName(animalName)
                .orElseThrow(() -> new NoSuchAnimalException(animalName)));
    }

    public AnimalJson findAnimalByScientificName(String scientificName) {
        return modelTransformer.animalToAnimalJson(animalRepository.findByScientificName(scientificName)
                .orElseThrow(() -> new NoSuchAnimalException(scientificName)));
    }

    public LocationJson addLocation(LocationJson locationJson) {
        return modelTransformer.locationToLocationJson(locationRepository.save(modelTransformer.locationJsonToLocation(locationJson)));
    }
}
