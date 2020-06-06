package com.wildlife.app.wildlife.app.summary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryRestResponse {
    List<SummaryRestModel> summaries;
    private String groupBy;
    private int totalTours;
}
