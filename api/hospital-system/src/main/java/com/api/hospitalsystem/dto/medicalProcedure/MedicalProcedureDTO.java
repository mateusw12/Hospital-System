package com.api.hospitalsystem.dto.medicalProcedure;

import com.api.hospitalsystem.dto.user.UserDTO;
import org.hibernate.validator.constraints.Length;
import java.util.List;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

public record MedicalProcedureDTO(
        @Id Long id,
        @NotNull @NotBlank @Length(max = 255) String name,
        @NotNull @NotBlank @Length(max = 2000) String description,
        @NotNull @PositiveOrZero Double price,
        List<UserDTO> doctors
) {
}
