package com.api.hospitalsystem.utils.decorator.phoneNumber;

import org.springframework.stereotype.Component;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile("^\\+?[1-9]\\d{1,14}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        Matcher matcher = PHONE_NUMBER_PATTERN.matcher(value);
        return matcher.matches();
    }

}
