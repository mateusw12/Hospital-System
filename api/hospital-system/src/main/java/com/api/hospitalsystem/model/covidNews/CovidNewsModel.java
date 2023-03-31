package com.api.hospitalsystem.model.covidNews;

import lombok.Data;

import java.util.List;

@Data
public class CovidNewsModel {

    private List<CovidNewsArticles> articles;

}
