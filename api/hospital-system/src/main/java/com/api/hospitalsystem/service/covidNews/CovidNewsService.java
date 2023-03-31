package com.api.hospitalsystem.service.covidNews;

import com.api.hospitalsystem.model.covidNews.CovidNewsModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CovidNewsService {

    private final String apiKey = "";

    public CovidNewsModel findNews() {
        String apiUrl = "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=pt&media=True";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "covid-19-news.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<CovidNewsModel> response;
        response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                entity,
                CovidNewsModel.class
        );
        CovidNewsModel covidNewsModel = response.getBody();
        return covidNewsModel;
    }

}
