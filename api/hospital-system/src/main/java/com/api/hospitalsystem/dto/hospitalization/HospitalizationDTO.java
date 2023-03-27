package com.api.hospitalsystem.dto.hospitalization;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;

import javax.persistence.Convert;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

public record HospitalizationDTO(
        @Id Long id,
        @NotNull @Positive Long doctorAppointmentId,
        @NotNull @Convert(converter = SectorConverter.class) Sector initialSector,
        @NotNull Date hospitalizationDate,
        @NotNull @Positive Long totalDays,
        Boolean isFinished
) {
}
