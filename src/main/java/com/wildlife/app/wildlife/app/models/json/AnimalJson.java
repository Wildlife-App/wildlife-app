package com.wildlife.app.wildlife.app.models.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class AnimalJson {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String animalId;
    private String animalName;
    private String scientificName;
    private String animalType;
    private String foodHabit;
    private String existenceStatus;
    private List<String> otherNames;
    private List<LocationJson> spottingLocations;
    private ReferenceJson referenceRecord;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date firstSpottingDate;
}
