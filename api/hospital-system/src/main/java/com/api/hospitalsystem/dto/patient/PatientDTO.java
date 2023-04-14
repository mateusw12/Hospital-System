package com.api.hospitalsystem.dto.patient;

import com.api.hospitalsystem.converter.gender.GenderConverter;
import com.api.hospitalsystem.converter.heathPlan.HeathPlanConverter;
import com.api.hospitalsystem.converter.maritalStatus.MaritalStatusConverter;
import com.api.hospitalsystem.model.gender.Gender;
import com.api.hospitalsystem.model.heathPlan.HeathPlan;
import com.api.hospitalsystem.model.maritalStatus.MaritalStatus;
import com.api.hospitalsystem.utils.decorator.cep.Cep;
import com.api.hospitalsystem.utils.decorator.cpf.Cpf;
import lombok.NonNull;
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
        @NotNull @NotBlank @Cpf @Length(max = 200) String cpf,
        @Convert(converter = HeathPlanConverter.class) HeathPlan heathPlan,
        @Length(max = 300) String email,
        @NotNull @NotBlank @Length(max = 20) String phone,
        @NotNull @NotBlank @Cep @Length(max = 20) String zipCode,
        @NotNull @NotBlank @Length(max = 200) String street,
        @NotNull @NotBlank @Length(max = 200) String district,
        @NotNull @NotBlank @Length(max = 200) String city,
        @NotNull @NotBlank @Length(max = 200) String state,
        @NotNull @PositiveOrZero() Long houseNumber,
        @NotNull @Positive() Long age,
        @Convert(converter = GenderConverter.class) @NotNull Gender gender,
        @Convert(converter = MaritalStatusConverter.class) @NotNull MaritalStatus maritalStatus,
        Boolean hasHeathPlan,
        @NonNull @Positive Long hospitalId
) {
}
