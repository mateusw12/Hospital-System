package com.api.hospitalsystem.dto.hospital;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record HospitalDTO(
        @Id Long id,
        @NotBlank @NotNull @Length(max = 200) String name,
        @Length(max = 200) String zipCode,
        @NotBlank @NotNull @Length(max = 200) String comercialName,
        @Length(max = 20) String phone,
        Boolean isActive
) {
}
