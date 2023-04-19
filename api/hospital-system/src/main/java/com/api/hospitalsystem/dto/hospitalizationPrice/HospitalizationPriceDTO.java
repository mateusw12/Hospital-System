package com.api.hospitalsystem.dto.hospitalizationPrice;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.Date;

public record HospitalizationPriceDTO(
        @Id Long id,
        @NotNull @Positive Long hospitalId,
        @NotNull @Positive Long doctorAppointmentId,
        @NotNull @PositiveOrZero Long totalDays,
        @NotNull @PositiveOrZero Double totalValue,
        Boolean isPayment,
        @NotNull Date paymentDate,
        @NotNull @NotBlank @Length(max = 200) String description
        ) {
}
