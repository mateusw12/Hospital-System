package com.api.hospitalsystem.utils.decorator.cep;

import com.api.hospitalsystem.model.cep.CepModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class CepValidator implements ConstraintValidator<Cep, String> {

    private static final String URL = "https://viacep.com.br/ws/";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public boolean isValid(String cep, ConstraintValidatorContext context) {
        CepModel cepModel = restTemplate.getForObject(URL + cep + "/json", CepModel.class);

        if (cepModel != null && cepModel.getCep() != null) {
            return true;
        }
        return false;
    }

}
