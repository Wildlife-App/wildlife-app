package com.wildlife.app.wildlife.app.summary;

import com.wildlife.app.wildlife.app.models.Tour;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryRestModel {
    private String groupByValue;
    private List<Tour> tours;
    private int tourCount;
    private String label;
}
