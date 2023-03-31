package com.api.hospitalsystem.controller.covidStatistic;

import com.api.hospitalsystem.model.covidStatistics.CovidStatisticsModel;
import com.api.hospitalsystem.service.covidStatistic.CovidStatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("api/covid/estatistica")
@Tag(name = "Consulta de dados sobre COVID-19")
public class CovidStatisticController {

    @Autowired
    private CovidStatisticService covidService;

    @GetMapping("/country/{country}")
    @Operation(summary = "Consulta dados sobre covid por país")
    public CovidStatisticsModel findStatisticsCountry(@PathVariable @NotNull @NotBlank String country) {
        return covidService.findStatisticsCountry(country);
    }

    @GetMapping("/country")
    @Operation(summary = "Consulta dados sobre covid de todos os países")
    public CovidStatisticsModel findStatistics() {
        return covidService.findStatistics();
    }

}
