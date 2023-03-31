package com.api.hospitalsystem.utils.decorator.doctors;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { DoctorsValidator.class })
public @interface Doctors {

    String message() default "A lista de médicos não pode ser nula";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
