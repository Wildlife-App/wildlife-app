package com.wildlife.app.wildlife.app.loader;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wildlife.app.wildlife.app.exception.AppLoadingException;
import com.wildlife.app.wildlife.app.loader.repository.AnimalTypeRepository;
import com.wildlife.app.wildlife.app.loader.repository.CountryRepository;
import com.wildlife.app.wildlife.app.loader.repository.ExistenceStatusRepository;
import com.wildlife.app.wildlife.app.loader.repository.FoodHabitTypeRepository;
import com.wildlife.app.wildlife.app.loader.repository.StateRepository;
import com.wildlife.app.wildlife.app.models.db.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.db.constants.ConstantData;
import com.wildlife.app.wildlife.app.models.db.constants.tables.Country;
import com.wildlife.app.wildlife.app.models.db.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.db.constants.tables.FoodHabitType;
import com.wildlife.app.wildlife.app.models.db.constants.tables.State;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@AllArgsConstructor
@SuppressWarnings("all")
public class InitialDataLoader {
    private static final Logger LOG = LoggerFactory.getLogger(InitialDataLoader.class);

    private AnimalTypeRepository animalTypeRepository;
    private ExistenceStatusRepository existenceStatusRepository;
    private FoodHabitTypeRepository foodHabitTypeRepository;
    private CountryRepository countryRepository;
    private StateRepository stateRepository;

    private ObjectMapper objectMapper;
    private ResourceLoader resourceLoader;

    private static final String COUNTRY_RESOURCE = "classpath:constant-table-data/country.json";
    private static final String STATE_RESOURCE = "classpath:constant-table-data/state.json";
    private static final String ANIMAL_TYPE_RESOURCE = "classpath:constant-table-data/animal-type.json";
    private static final String FOOD_HABIT_TYPE_RESOURCE = "classpath:constant-table-data/food-type.json";
    private static final String EXISTENCE_STATUS_RESOURCE = "classpath:constant-table-data/existence-status.json";

    @Bean
    @Qualifier("animalTypes")
    public List<AnimalType> animalTypes() {
        return readOrSave(animalTypeRepository, ANIMAL_TYPE_RESOURCE, AnimalType.class);
    }

    @Bean
    @Qualifier("foodHabitTypes")
    public List<FoodHabitType> foodHabitType() {
        return readOrSave(foodHabitTypeRepository, FOOD_HABIT_TYPE_RESOURCE, FoodHabitType.class);
    }

    @Bean
    @Qualifier("existenceStatuses")
    public List<ExistenceStatus> existenceStatuses() {
        return readOrSave(existenceStatusRepository, EXISTENCE_STATUS_RESOURCE, ExistenceStatus.class);
    }

    @Bean
    @Qualifier("countries")
    @Profile("data-loader")
    public List<Country> countriesFromJson() {
        LOG.info("data-loader profile is active therefore loading Countries from JSON file.");

        List<Country> countries = extract(COUNTRY_RESOURCE, Country.class)
                .stream().filter(Country::isNotEmpty).collect(Collectors.toList());
        LOG.info("Found {} countries in data file.", countries.size());

        List<State> states = extract(STATE_RESOURCE, State.class)
                .stream().filter(State::isNotEmpty).collect(Collectors.toList());
        LOG.info("Found {} states in data file.", states.size());

        countries.forEach(country -> country.setStates(states.stream()
                .filter(state -> state.getCountryCode().equals(country.getCountryCode())).collect(Collectors.toList())));
        return countryRepository.saveAll(countries);
    }

    @Bean
    @Qualifier("states")
    @Profile("data-loader")
    public List<State> statesFromJson() {
        LOG.info("data-loader profile is active therefore loading States from JSON file.");
        List<Country> countries = extract(COUNTRY_RESOURCE, Country.class)
                .stream().filter(Country::isNotEmpty).collect(Collectors.toList());
        LOG.info("Found {} countries in data file.", countries.size());

        List<State> states = extract(STATE_RESOURCE, State.class)
                .stream().filter(State::isNotEmpty).collect(Collectors.toList());
        LOG.info("Found {} states in data file.", states.size());

        countries.forEach(country -> country.setStates(states.stream()
                .filter(state -> state.getCountryCode().equals(country.getCountryCode())).collect(Collectors.toList())));
        List<Country> savedCountries = countryRepository.saveAll(countries);
        List<State> allStates = new ArrayList<>();

        savedCountries.forEach(country -> allStates.addAll(country.getStates()));

        return allStates;
    }

    @Bean
    @Qualifier("states")
    @Profile("!data-loader")
    public List<State> statesFromDB() {
        LOG.info("data-loader profile is inactive therefore loading States from Database.");
        return Collections.unmodifiableList(stateRepository.findAll());
    }

    @Bean
    @Qualifier("countries")
    @Profile("!data-loader")
    public List<Country> countriesFromDB() {
        LOG.info("data-loader profile is inactive therefore loading Countries from Database.");
        return Collections.unmodifiableList(countryRepository.findAll());
    }

    private <T> List<T> extract(String resourceLocation, Class<T> collectionType) {
        try {
            Class<T[]> arrayClass = (Class<T[]>) Class.forName("[L" + collectionType.getTypeName() + ";");
            T[] readValue = objectMapper.readValue(resourceLoader.getResource(resourceLocation).getFile(), arrayClass);

            if (readValue == null || readValue.length == 0) {
                LOG.error("No record was found in the saved file.");
                throw new AppLoadingException("No record was found in the saved file.");
            }
            return Arrays.asList(readValue);
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }

    private <T extends ConstantData> List<T> readOrSave(JpaRepository<T, String> repository, String resource, Class<T> type) {
        List<T> savedTypes = repository.findAll();

        if (savedTypes == null || savedTypes.isEmpty()) {
            LOG.info("No {} was found in database. Trying to read from constant resource.", type.getSimpleName());
            List<T> typesFromFile = extract(resource, type);
            filter(typesFromFile);
            LOG.info("Read {} records.", typesFromFile.size());
            List<T> typesToSave = typesFromFile.stream().filter(ConstantData::isNotEmpty).collect(Collectors.toList());

            LOG.info("Saving {} records.", typesToSave.size());
            savedTypes = repository.saveAll(typesToSave);

            LOG.info("Saved {} records.", savedTypes.size());
        }

        return savedTypes;
    }

    @SneakyThrows
    private <T extends ConstantData> void filter(List<T> typesFromFile) {
        if (typesFromFile == null || typesFromFile.isEmpty()) {
            return;
        }
        T obj = typesFromFile.get(0);
        Field[] fields = obj.getClass().getDeclaredFields();

        for (T t : typesFromFile) {
            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(t);
                if (value instanceof List) {
                    List<ConstantData> list = (List) value;
                    list.removeIf(ConstantData::isEmpty);
                }
            }
        }
    }
}
