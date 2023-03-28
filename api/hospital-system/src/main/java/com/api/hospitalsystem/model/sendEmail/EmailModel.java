package com.api.hospitalsystem.model.sendEmail;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class EmailModel {

    @NotNull
    @NotBlank
    @Length(min = 1, max = 200)
    public String subject;

    @NotNull
    @NotBlank
    @Length(min = 1, max = 2000)
    public String body;

    @NotNull
    @NotBlank
    @Email
    public String recipient;

}
