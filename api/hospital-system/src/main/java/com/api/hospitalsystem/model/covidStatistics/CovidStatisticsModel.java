package com.api.hospitalsystem.model.covidStatistics;

import lombok.Data;

import java.util.List;

@Data
public class CovidStatisticsModel {

    private String get;
    private List<StatisticResponse> response;

}
