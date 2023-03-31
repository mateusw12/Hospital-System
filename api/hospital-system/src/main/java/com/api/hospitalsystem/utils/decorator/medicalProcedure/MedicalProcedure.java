package com.api.hospitalsystem.utils.decorator.medicalProcedure;

import com.api.hospitalsystem.utils.decorator.futureDate.FutureDateValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { MedicalProcedureValidator.class })
public @interface MedicalProcedure {

    String message() default "A lista de procedimentos não pode ser nula";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
