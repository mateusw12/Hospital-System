package com.api.hospitalsystem.model.covidNews;

import lombok.Data;

import java.util.Date;

@Data
public class CovidNewsArticles {

    private Double _score;
    private String author;
    private String clean_url;
    private String country;
    private String link;
    private Date published_date;
    private String summary;
    private String title;
    private String topic;

}
