package com.wildlife.app.wildlife.app.validators;

import com.wildlife.app.wildlife.app.models.db.Animal;
import com.wildlife.app.wildlife.app.repository.AnimalRepository;
import com.wildlife.app.wildlife.app.util.ErrorConstants;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Component("beforeCreateCreateAnimalRequestValidator")
@AllArgsConstructor
public class CreateAnimalRequestValidator implements Validator, ErrorConstants {
    private static final Logger LOG = LoggerFactory.getLogger(CreateAnimalRequestValidator.class);
    private static final Pattern NAME_PATTERN = Pattern.compile("^[a-zA-Z\\s]{3,50}$");
    private static final List<String> GENDERS = Arrays.asList("MALE", "FEMALE", "YOUNG", "COMMON");
    private AnimalRepository animalRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Animal.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Animal animal = (Animal) o;

        if (StringUtils.isEmpty(animal.getAnimalName())) {
            LOG.error("No name of the animal provided.");
            errors.rejectValue("animalName", EMPTY_ANIMAL_NAME,
                    "Please provide a name for the animal.");
            return;
        }

        if (StringUtils.isEmpty(animal.getScientificName())) {
            LOG.error("No scientific name of the animal provided.");
            errors.rejectValue("scientificName", EMPTY_ANIMAL_SCIENTIFIC_NAME,
                    "Please provide the scientific name of the animal.");
            return;
        }
        animal.setAnimalName(animal.getAnimalName().trim());
        if (!NAME_PATTERN.matcher(animal.getAnimalName()).find()) {
            LOG.error("Animal name contains digit or special character!!");
            errors.rejectValue("animalName", ANIMAL_NAME_CONTAINS_DIGIT_SP_CHAR,
                    "Name should be 3-50 characters long. No digit or special character is allowed.");
            return;
        }
        animal.setScientificName(animal.getScientificName().trim());
        if (!NAME_PATTERN.matcher(animal.getScientificName()).find()) {
            LOG.error("Scientific name contains digit or special character!!");
            errors.rejectValue("scientificName", ANIMAL_SCIENTIFIC_NAME_CONTAINS_DIGIT_SP_CHAR,
                    "Scientific name should be 3-50 characters long. No digit or special is character allowed.");
            return;
        }

        if (StringUtils.isEmpty(animal.getScientificName())) {
            LOG.error("No name of the animal provided.");
            errors.rejectValue("scientificName", ANIMAL_NAME_CONTAINS_DIGIT_SP_CHAR,
                    String.format("%s is already part of our record!!", animal.getAnimalName()));
            return;
        }

        Optional<Animal> searchByName = animalRepository.findByAnimalName(animal.getAnimalName());
        if (searchByName.isPresent()) {
            LOG.error("Duplicate animal name entered.");
            errors.rejectValue("animalName", DUPLICATE_ANIMAL_NAME,
                    String.format("%s is already part of our record!!", animal.getAnimalName()));
            return;
        }

        Optional<Animal> searchByScientificName = animalRepository.findByScientificName(animal.getScientificName());
        if (searchByScientificName.isPresent()) {
            Animal existingAnimal = searchByScientificName.get();
            LOG.error("Duplicate scientific name - [{}]", animal.getScientificName());
            errors.rejectValue("scientificName", DUPLICATE_ANIMAL_SCIENTIFIC_NAME,
                    String.format("%s is the scientific name of %s. Please enter correct animal name!!",
                            existingAnimal.getScientificName(), existingAnimal.getAnimalName()));
            return;
        }

        if (StringUtils.isEmpty(animal.getAnimalGender())) {
            LOG.error("Empty gender!!");
            errors.rejectValue("animalGender", EMPTY_ANIMAL_GENDER,
                    "Please define the gender of the animal!!");
            return;
        }

        if (!GENDERS.contains(animal.getAnimalGender())) {
            LOG.error("Invalid gender!!");
            errors.rejectValue("animalGender", INVALID_ANIMAL_GENDER,
                    String.format("Please enter valid gender - [%s]", String.join(" ", GENDERS)));
            return;
        }

    }
}
