package com.api.hospitalsystem.dto.permission;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public record PermissionDTO(
        @Id Long id,
        @NotBlank @NotNull @Length(max = 200) String userName,
        @NotNull @Positive Long itemId
) {
}
