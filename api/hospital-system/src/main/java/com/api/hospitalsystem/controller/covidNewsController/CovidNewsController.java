package com.api.hospitalsystem.controller.covidNewsController;

import com.api.hospitalsystem.model.covidNews.CovidNewsModel;
import com.api.hospitalsystem.service.covidNews.CovidNewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("api/covid/noticias")
@Tag(name = "Consulta noticias sobre COVID-19")
public class CovidNewsController {

    @Autowired
    private CovidNewsService covidNewsService;

    @GetMapping
    @Operation(summary = "Consulta noticias sobre covid")
    public CovidNewsModel findNews() {
        return covidNewsService.findNews();
    }

}
