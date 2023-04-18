package com.api.hospitalsystem.utils.decorator.futureDate;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Date;

@Component
public class FutureDateValidator implements ConstraintValidator<FutureDate, Date> {

    @Override
    public boolean isValid(Date value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        Date today = new Date();
        return value.before(today);
    }

}
