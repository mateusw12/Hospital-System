package com.api.hospitalsystem.dto.hospitalizationHistoric;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;

import javax.persistence.Convert;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public record HospitalizationHistoricDTO(
        @Id Long id,
        @NotNull @Positive Long hospitalizationId,
        @NotNull @Convert(converter = SectorConverter.class) Sector currentSector,
        @NotNull @Positive Long days
        ) {
}
