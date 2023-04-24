package com.api.hospitalsystem.service.covidStatistic;

import com.api.hospitalsystem.model.covidStatistics.CovidStatisticsModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CovidStatisticService {

    private final String apiKey = "5e6bae4b07mshe77f32ea846bc94p149ec3jsn926370fa091c";

    public CovidStatisticsModel findStatisticsCountry(String country) {
        String apiUrl = "https://covid-193.p.rapidapi.com/statistics";
        String countryFormat = country.replace(" ", "%20");

        if(country.length() > 0){
            apiUrl = apiUrl+"?country="+countryFormat;
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "covid-193.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<CovidStatisticsModel> response;
        response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                entity,
                CovidStatisticsModel.class
        );
        CovidStatisticsModel covidStatistics = response.getBody();
        return covidStatistics;
    }

    public CovidStatisticsModel findStatistics() {
        String apiUrl = "https://covid-193.p.rapidapi.com/statistics";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "covid-193.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<CovidStatisticsModel> response;
        response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                entity,
                CovidStatisticsModel.class
        );
        CovidStatisticsModel covidStatistics = response.getBody();
        return covidStatistics;
    }

}
