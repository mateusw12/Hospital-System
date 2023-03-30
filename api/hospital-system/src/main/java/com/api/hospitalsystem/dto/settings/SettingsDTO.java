package com.api.hospitalsystem.dto.settings;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record SettingsDTO(
        @Id Long id,
        @NotNull @NotBlank @Length(max = 200) String name,
        @NotNull @NotBlank @Length(max = 200) String themeColor,
        @NotNull @NotBlank String logo,
        @NotNull @NotBlank @Length(max = 200) String fileName
        ) {
}
