package com.wildlife.app.wildlife.app.loader;

import com.wildlife.app.wildlife.app.exception.AppLoadingException;
import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.constants.tables.Country;
import com.wildlife.app.wildlife.app.models.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.constants.tables.FoodHabitType;
import com.wildlife.app.wildlife.app.models.constants.tables.State;
import com.wildlife.app.wildlife.app.repository.AnimalTypeRepository;
import com.wildlife.app.wildlife.app.repository.CountryRepository;
import com.wildlife.app.wildlife.app.repository.ExistenceStatusRepository;
import com.wildlife.app.wildlife.app.repository.FoodHabitTypeRepository;
import com.wildlife.app.wildlife.app.repository.StateRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.annotation.PostConstruct;
import java.io.Reader;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Profile("data-loader")
@Configuration
@AllArgsConstructor
public class BasicDataLoader implements DBColumnConstants {
    private static final Logger LOG = LoggerFactory.getLogger(BasicDataLoader.class);

    private static final String COUNTRY_RESOURCE = "constant-table-data/countries.csv";
    private static final String STATE_RESOURCE = "constant-table-data/states.csv";
    private static final String ANIMAL_TYPE_RESOURCE = "constant-table-data/animal_types.csv";
    private static final String FOOD_HABIT_TYPE_RESOURCE = "constant-table-data/food_habits.csv";
    private static final String EXISTENCE_STATUS_RESOURCE = "constant-table-data/existence_statuses.csv";

    private CountryRepository countryRepository;
    private StateRepository stateRepository;
    private AnimalTypeRepository animalTypeRepository;
    private ExistenceStatusRepository existenceStatusRepository;
    private FoodHabitTypeRepository foodHabitTypeRepository;

    @PostConstruct
    public void loadAllData() {
        loadCountries();
        loadStates();
        loadAnimalTypes();
        loadFoodHabitTypes();
        loadExistenceStatuses();
    }

    private void loadCountries() {
        try (Reader reader = Files.newBufferedReader(Paths.get(getResourceUri(COUNTRY_RESOURCE)));
             CSVParser csvParser = new CSVParser(reader, configuredCsvFormat())
        ) {
            List<Country> countries = new ArrayList<>();
            for (CSVRecord record : csvParser) {
                countries.add(Country.builder()
                        .countryCode(record.get(COL_TBL_COUNTRY_CODE))
                        .countryName(record.get(COL_TBL_COUNTRY_NAME))
                        .isdCode(record.get(COL_TBL_COUNTRY_ISD))
                        .build());
            }
            List<Country> saved = countryRepository.saveAll(countries);
            LOG.info("Added {} country records", saved.size());
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }

    private void loadStates() {
        try (Reader reader = Files.newBufferedReader(Paths.get(getResourceUri(STATE_RESOURCE)));
             CSVParser csvParser = new CSVParser(reader, configuredCsvFormat())
        ) {
            List<State> states = new ArrayList<>();
            for (CSVRecord record : csvParser) {
                states.add(State.builder()
                        .stateCode(record.get(COL_TBL_STATE_CODE))
                        .stateName(record.get(COL_TBL_STATE_NAME))
                        .country(Country.builder().countryCode(record.get(COL_TBL_COUNTRY_CODE)).build())
                        .build());
            }
            List<State> saved = stateRepository.saveAll(states);
            LOG.info("Added {} state records", saved.size());
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }

    private void loadAnimalTypes() {
        try (Reader reader = Files.newBufferedReader(Paths.get(getResourceUri(ANIMAL_TYPE_RESOURCE)));
             CSVParser csvParser = new CSVParser(reader, configuredCsvFormat())
        ) {
            List<AnimalType> animalTypes = new ArrayList<>();
            for (CSVRecord record : csvParser) {
                animalTypes.add(AnimalType.builder()
                        .animalTypeId(record.get(COL_ANIMAL_TYPE_ID))
                        .animalTypeName(record.get(COL_ANIMAL_TYPE_NAME))
                        .animalTypeDefinition(record.get(COL_ANIMAL_TYPE_DEFINITION))
                        .build());
            }
            List<AnimalType> saved = animalTypeRepository.saveAll(animalTypes);
            LOG.info("Added {} Animal Types", saved.size());
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }

    private void loadFoodHabitTypes() {
        try (Reader reader = Files.newBufferedReader(Paths.get(getResourceUri(FOOD_HABIT_TYPE_RESOURCE)));
             CSVParser csvParser = new CSVParser(reader, configuredCsvFormat())
        ) {
            List<FoodHabitType> foodHabitTypes = new ArrayList<>();
            for (CSVRecord record : csvParser) {
                foodHabitTypes.add(FoodHabitType.builder()
                        .foodHabitTypeId(record.get(COL_FOOD_HABIT_TYPE_ID))
                        .foodHabitType(record.get(COL_FOOD_HABIT_TYPE))
                        .foodHabitTypeDefinition(record.get(COL_FOOD_HABIT_TYPE_DEFINITION))
                        .build());
            }
            List<FoodHabitType> saved = foodHabitTypeRepository.saveAll(foodHabitTypes);
            LOG.info("Added {} Food Habit Types", saved.size());
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }

    private void loadExistenceStatuses() {
        try (Reader reader = Files.newBufferedReader(Paths.get(getResourceUri(EXISTENCE_STATUS_RESOURCE)));
             CSVParser csvParser = new CSVParser(reader, configuredCsvFormat())
        ) {
            List<ExistenceStatus> existenceStatuses = new ArrayList<>();
            for (CSVRecord record : csvParser) {
                existenceStatuses.add(ExistenceStatus.builder()
                        .existenceStatusId(record.get(COL_EXISTENCE_STATUS_ID))
                        .existenceStatus(record.get(COL_EXISTENCE_STATUS))
                        .existenceStatusDescription(record.get(COL_EXISTENCE_STATUS_DESCRIPTION))
                        .build());
            }
            List<ExistenceStatus> saved = existenceStatusRepository.saveAll(existenceStatuses);
            LOG.info("Added {} Existence Statuses", saved.size());
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }


    private URI getResourceUri(String resourceName) throws URISyntaxException {
        return Objects.requireNonNull(this.getClass().getClassLoader().getResource(resourceName)).toURI();
    }

    private CSVFormat configuredCsvFormat() {
        return CSVFormat.DEFAULT
                .withFirstRecordAsHeader()
                .withIgnoreHeaderCase()
                .withTrim();
    }
}
