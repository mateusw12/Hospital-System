package com.api.hospitalsystem.dto.item;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record ItemDTO(
        @Id Long id,
        @NotBlank @NotNull @Length(max = 200) String description,
        @Length(max = 200) String descriptionFather,
        @NotBlank @NotNull @Length(max = 200) String onlyPath,
        @NotBlank @NotNull @Length(max = 300) String path,
        @Length(max = 200) String itemFather,
        Boolean visible
) {
}
