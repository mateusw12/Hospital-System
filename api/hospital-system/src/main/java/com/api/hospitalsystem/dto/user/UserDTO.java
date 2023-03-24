package com.api.hospitalsystem.dto.user;

import com.api.hospitalsystem.converter.role.RoleConverter;
import com.api.hospitalsystem.model.role.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Convert;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public record UserDTO(
        @Id Long id,
        @NotNull @NotBlank @Length(max = 200) String name,
        @NotNull @NotBlank @Length(max = 200) String userName,
        @NotNull @NotBlank @Length(max = 200) String crm,
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) @NotNull @NotBlank @Length(max = 200) String password,
        Boolean isActive,
        @Convert(converter = RoleConverter.class) @NotNull Role role,
        @Email @NotNull @NotBlank @Length(max = 300) String email,
        @NotNull @Positive Long hospitalId
) {
}
