package com.api.hospitalsystem.utils.decorator.crm;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class CrmValidator implements ConstraintValidator<Crm, String> {

    @Override
    public boolean isValid(String crm, ConstraintValidatorContext context) {
        // Obtem a sigla do estado a partir do CRM
        String siglaEstado = crm.substring(0, 2);

        // Define a regex correspondente ao estado
        String regexEstado = "";
        switch (siglaEstado) {
            case "AC":
                regexEstado = "^699\\d{5}$";
                break;
            case "AL":
                regexEstado = "^57\\d{5}$";
                break;
            case "AP":
                regexEstado = "^689\\d{5}$";
                break;
            case "AM":
                regexEstado = "^69\\d{5}$";
                break;
            case "BA":
                regexEstado = "^\\d{5}-\\d{3}$|^\\d{8}$";
                break;
            case "CE":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "DF":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "ES":
                regexEstado = "^29\\d{5}$";
                break;
            case "GO":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "MA":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "MT":
                regexEstado = "^78\\d{5}$";
                break;
            case "MS":
                regexEstado = "^79\\d{5}$";
                break;
            case "MG":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "PA":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "PB":
                regexEstado = "^58\\d{5}$";
                break;
            case "PR":
                regexEstado = "^\\d{8}$|^\\d{5}-\\d{3}$";
                break;
            case "PE":
                regexEstado = "^\\d{5}-\\d{3}$";
                break;
            case "PI":
                regexEstado = "^64\\d{5}$";
                break;
            case "RJ":
                regexEstado = "^\\d{8}$";
                break;
            case "RN":
                regexEstado = "^59\\d{5}$";
                break;
            case "RS":
                regexEstado = "^\\d{8}$|^\\d{5}-\\d{3}$";
                break;
            case "RO":
                regexEstado = "^768\\d{5}$";
                break;
            case "RR":
                regexEstado = "^693\\d{5}$";
                break;
            case "SC":
                regexEstado = "^89\\d{5}$";
                break;
            case "SP":
                regexEstado = "^\\w{2}-\\d{6}-\\d$";
                break;
            case "SE":
                regexEstado = "^49\\d{5}$";
                break;
            case "TO":
                regexEstado = "^77\\d{5}$";
                break;
            default:
                return false;
        }
        return crm.matches(regexEstado);
    }

}