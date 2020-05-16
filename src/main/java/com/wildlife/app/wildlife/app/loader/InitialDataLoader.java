package com.wildlife.app.wildlife.app.loader;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wildlife.app.wildlife.app.exception.AppLoadingException;
import com.wildlife.app.wildlife.app.models.constants.ConstantData;
import com.wildlife.app.wildlife.app.models.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.constants.tables.FoodHabitType;
import com.wildlife.app.wildlife.app.models.constants.tables.MenuItem;
import com.wildlife.app.wildlife.app.models.constants.tables.validation.ValidForm;
import com.wildlife.app.wildlife.app.repository.AnimalTypeRepository;
import com.wildlife.app.wildlife.app.repository.ExistenceStatusRepository;
import com.wildlife.app.wildlife.app.repository.FoodHabitTypeRepository;
import com.wildlife.app.wildlife.app.repository.MenuItemRepository;
import com.wildlife.app.wildlife.app.repository.ValidationRepository;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.PostConstruct;
import java.lang.reflect.Field;
import java.util.Arrays;
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
    private MenuItemRepository menuItemRepository;
    private ValidationRepository validationRepository;

    private ObjectMapper objectMapper;
    private ResourceLoader resourceLoader;

    private static final String ANIMAL_TYPE_RESOURCE = "classpath:constant-table-data/animal-type.json";
    private static final String FOOD_HABIT_TYPE_RESOURCE = "classpath:constant-table-data/food-type.json";
    private static final String EXISTENCE_STATUS_RESOURCE = "classpath:constant-table-data/existence-status.json";
    private static final String MENU_ITEMS_RESOURCE = "classpath:constant-table-data/menu-item.json";
    private static final String VALIDATION_MESSAGES_RESOURCE = "classpath:constant-table-data/validation.json";

    @PostConstruct
    public void loadAnimalTypes() {
        readOrSave(animalTypeRepository, ANIMAL_TYPE_RESOURCE, AnimalType.class);
    }

    @PostConstruct
    public void loadFoodHabitType() {
        readOrSave(foodHabitTypeRepository, FOOD_HABIT_TYPE_RESOURCE, FoodHabitType.class);
    }

    @PostConstruct
    public void loadExistenceStatuses() {
        readOrSave(existenceStatusRepository, EXISTENCE_STATUS_RESOURCE, ExistenceStatus.class);
    }

    @PostConstruct
    public void loadMenuItems() {
        readOrSave(menuItemRepository, MENU_ITEMS_RESOURCE, MenuItem.class);
    }

    @PostConstruct
    public void loadValidation() {
        LOG.info("Loading validation messages...");
        List<ValidForm> validForms = extract(VALIDATION_MESSAGES_RESOURCE, ValidForm.class);
        validForms.forEach(this::shapeData);
        LOG.info("Loaded {} validation messages from json", validForms.size());
        validationRepository.saveAll(validForms);
    }

    private void shapeData(ValidForm validForm) {
        validForm.getFormFields().forEach(formField -> {
            formField.setFormFieldId(String.format("%s.%s", validForm.getFormName(),
                    formField.getFormFieldName()));
            formField.getValidationMessages().forEach(validationMessage -> {
                validationMessage.setValidationMessageId(
                        String.format("%s.%s.%s", validForm.getFormName(),
                                formField.getFormFieldName(),
                                validationMessage.getMessageKey()));
            });
        });
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
