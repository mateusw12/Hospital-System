package com.api.hospitalsystem.model.covidStatistics;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StatisticCase {

    @JsonProperty("1M_pop")
    private String pop1Mi;

    private Long active;

    private Long critical;

    @JsonProperty("\u006Eew")
    private String newCase;

    private Long recovered;

    private Long total;

}
