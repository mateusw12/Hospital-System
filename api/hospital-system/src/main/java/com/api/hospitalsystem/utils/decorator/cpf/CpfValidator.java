package com.api.hospitalsystem.utils.decorator.cpf;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class CpfValidator implements ConstraintValidator<Cpf, String> {

    @Override
    public void initialize(Cpf cpf) {
    }

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext cxt) {

        if (cpf == null) {
            return false;
        }

        // Remove caracteres especiais
        cpf = cpf.replaceAll("[^0-9]", "");

        // Verifica se o CPF possui 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        boolean allEqual = true;
        for (int i = 1; i < cpf.length(); i++) {
            if (cpf.charAt(i) != cpf.charAt(0)) {
                allEqual = false;
                break;
            }
        }
        if (allEqual) {
            return false;
        }

        // Calcula os dígitos verificadores
        int[] digits = new int[11];
        for (int i = 0; i < 11; i++) {
            digits[i] = Character.getNumericValue(cpf.charAt(i));
        }
        int dv1 = 0, dv2 = 0;
        for (int i = 0; i < 9; i++) {
            dv1 += digits[i] * (10 - i);
            dv2 += digits[i] * (11 - i);
        }
        dv1 = (dv1 % 11) < 2 ? 0 : 11 - (dv1 % 11);
        dv2 += dv1 * 2;
        dv2 = (dv2 % 11) < 2 ? 0 : 11 - (dv2 % 11);

        // Verifica os dígitos verificadores
        if (digits[9] != dv1 || digits[10] != dv2) {
            return false;
        }

        return true;
    }

}
