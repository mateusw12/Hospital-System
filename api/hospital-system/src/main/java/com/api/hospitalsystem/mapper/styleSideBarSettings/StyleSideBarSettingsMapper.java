package com.api.hospitalsystem.mapper.styleSideBarSettings;

import com.api.hospitalsystem.dto.styleSideBarSettings.StyleSideBarSettingsDTO;
import com.api.hospitalsystem.model.styleSideBarSettings.StyleSideBarSettingsModel;
import org.springframework.stereotype.Component;

@Component
public class StyleSideBarSettingsMapper {

    public StyleSideBarSettingsDTO toDTO(StyleSideBarSettingsModel styleSideBarSettingsModel) {
        if (styleSideBarSettingsModel == null) {
            return null;
        }
        return new StyleSideBarSettingsDTO(
                styleSideBarSettingsModel.getId(),
                styleSideBarSettingsModel.getHospitalId(),
                styleSideBarSettingsModel.getOnlyColorSideBar(),
                styleSideBarSettingsModel.getFirstColorSideBar(),
                styleSideBarSettingsModel.getSecondColorSideBar(),
                styleSideBarSettingsModel.getDirectionGradient(),
                styleSideBarSettingsModel.getMenuColorSideBar(),
                styleSideBarSettingsModel.getMenuHoverColorSideBar(),
                styleSideBarSettingsModel.getMenuColorSideBar(),
                styleSideBarSettingsModel.getIsGradient()
        );
    }

    public StyleSideBarSettingsModel toEntity(StyleSideBarSettingsDTO styleSideBarSettingsDTO) {

        if (styleSideBarSettingsDTO == null) {
            return null;
        }

        StyleSideBarSettingsModel styleSideBarSettingsModel = new StyleSideBarSettingsModel();
        if (styleSideBarSettingsDTO.id() != null) {
            styleSideBarSettingsModel.setId(styleSideBarSettingsDTO.id());
        }
        styleSideBarSettingsModel.setColorTextSideBar(styleSideBarSettingsDTO.colorTextSideBar());
        styleSideBarSettingsModel.setDirectionGradient(styleSideBarSettingsDTO.directionGradient());
        styleSideBarSettingsModel.setFirstColorSideBar(styleSideBarSettingsDTO.firstColorSideBar());
        styleSideBarSettingsModel.setSecondColorSideBar(styleSideBarSettingsDTO.secondColorSideBar());
        styleSideBarSettingsModel.setHospitalId(styleSideBarSettingsDTO.hospitalId());
        styleSideBarSettingsModel.setIsGradient(styleSideBarSettingsDTO.isGradient());
        styleSideBarSettingsModel.setMenuHoverColorSideBar(styleSideBarSettingsDTO.menuHoverColorSideBar());
        styleSideBarSettingsModel.setMenuColorSideBar(styleSideBarSettingsDTO.menuColorSideBar());
        styleSideBarSettingsModel.setOnlyColorSideBar(styleSideBarSettingsDTO.onlyColorSideBar());
        return styleSideBarSettingsModel;
    }

}
