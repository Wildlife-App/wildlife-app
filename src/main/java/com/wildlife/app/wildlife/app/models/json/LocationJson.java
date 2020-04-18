package com.wildlife.app.wildlife.app.models.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationJson {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String locationId;
    private String locationName;
    private String state;
    private String country;
    private double area;
}
