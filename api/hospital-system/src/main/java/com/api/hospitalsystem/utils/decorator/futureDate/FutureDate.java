package com.api.hospitalsystem.utils.decorator.futureDate;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { FutureDateValidator.class })
public @interface FutureDate {

    String message() default "A data informada deve ser maior que a data atual";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}