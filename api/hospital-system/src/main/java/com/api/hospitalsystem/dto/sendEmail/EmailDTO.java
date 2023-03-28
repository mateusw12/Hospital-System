package com.api.hospitalsystem.dto.sendEmail;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record EmailDTO(
        @NotNull @NotBlank @Length(min = 1, max = 200) String subject,
        @NotNull @NotBlank @Length(min = 1, max = 2000) String body,
        @NotNull @NotBlank @Email String recipient
) {
}
