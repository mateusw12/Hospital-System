package com.api.hospitalsystem.dto.sectorSettings;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;
import lombok.NonNull;

import javax.persistence.Convert;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

public record SectorSettingsDTO(
        @Id Long id,
        @NotNull @Convert(converter = SectorConverter.class) Sector sector,
        @NotNull @Positive Long hospitalId,
        @NotNull @PositiveOrZero Double dailyPrice,
        Boolean hasHealthInsurance,
        @NonNull @PositiveOrZero Long bedNumber
        ) {
}
