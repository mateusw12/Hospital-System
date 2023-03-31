package com.api.hospitalsystem.utils.decorator.cpf;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { CpfValidator.class })
public @interface Cpf {

    String message() default "O CPF informado é inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
