package com.api.hospitalsystem.utils.decorator.phoneNumber;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PhoneNumberValidator.class })
public @interface PhoneNumber {

    String message() default "O número de telefone informado é inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};


}
