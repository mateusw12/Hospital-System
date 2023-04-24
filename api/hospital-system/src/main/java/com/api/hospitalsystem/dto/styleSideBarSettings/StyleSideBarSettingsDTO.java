package com.api.hospitalsystem.dto.styleSideBarSettings;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public record StyleSideBarSettingsDTO(
        Long id,
        @NotNull @Positive Long hospitalId,
        @Length(max = 50) String onlyColorSideBar,
        @Length(max = 50) String firstColorSideBar,
        @Length(max = 50) String secondColorSideBar,
        @Length(max = 50) String directionGradient,
        @NotNull @NotBlank @Length(max = 50) String colorTextSideBar,

        @NotNull @NotBlank @Length(max = 50) String menuColorSideBar,
        @NotNull @NotBlank @Length(max = 50) String menuHoverColorSideBar,
        Boolean isGradient
) {
}
