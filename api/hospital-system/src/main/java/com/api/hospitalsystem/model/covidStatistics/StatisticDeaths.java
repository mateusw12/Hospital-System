package com.api.hospitalsystem.model.covidStatistics;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StatisticDeaths {

    @JsonProperty("1M_pop")
    private String pop1Mi;

    @JsonProperty("new")
    private String news;

    private Long total;

}
