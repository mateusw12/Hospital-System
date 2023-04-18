package com.api.hospitalsystem.dto.doctorAppointment;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

public record DoctorAppointmentDTO(
        @Id Long id,
        @NotNull @NotBlank @Length(max = 200) String userName,
        @NotNull @Positive Long patientId,
        @NotNull @Positive Long hospitalId,
        @NotNull Date appointmentDate,
        @NotNull @NotBlank @Length(max = 1000) String observation,
        @NotNull @NotBlank @Length(max = 1000) String prescription,
        @NotNull Boolean medicalCertificate
) {
}
