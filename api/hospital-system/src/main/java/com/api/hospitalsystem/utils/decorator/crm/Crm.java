package com.api.hospitalsystem.utils.decorator.crm;

import com.api.hospitalsystem.utils.decorator.phoneNumber.PhoneNumberValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { CrmValidator.class })
public @interface Crm {

    String message() default "O CRM informado é inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
