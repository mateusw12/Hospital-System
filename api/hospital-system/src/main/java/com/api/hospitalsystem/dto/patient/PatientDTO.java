package com.api.hospitalsystem.dto.patient;

import com.api.hospitalsystem.converter.gender.GenderConverter;
import com.api.hospitalsystem.converter.maritalStatus.MaritalStatusConverter;
import com.api.hospitalsystem.model.gender.Gender;
import com.api.hospitalsystem.model.maritalStatus.MaritalStatus;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Convert;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

public record PatientDTO(
        @Id Long id,
        @NotNull @NotBlank @Length(max = 200) String name,
        @Length(max = 300) String email,
        @Length(max = 20) String phone,
        @NotNull @NotBlank @Length(max = 20) String cep,
        @NotNull @PositiveOrZero() Long houseNumber,
        @NotNull @Positive() Long age,
        @Convert(converter = GenderConverter.class) @NotNull Gender gender,
        @Convert(converter = MaritalStatusConverter.class) @NotNull MaritalStatus maritalStatus
) {
}
