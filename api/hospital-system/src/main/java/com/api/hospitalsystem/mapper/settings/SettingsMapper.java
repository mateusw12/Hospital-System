package com.api.hospitalsystem.mapper.settings;

import com.api.hospitalsystem.dto.settings.SettingsDTO;
import com.api.hospitalsystem.model.settings.SettingsModel;
import org.springframework.stereotype.Component;

@Component
public class SettingsMapper {

    public SettingsDTO toDTO(SettingsModel settingsModel) {
        if (settingsModel == null) {
            return null;
        }
        return new SettingsDTO(
                settingsModel.getId(),
                settingsModel.getName(),
                settingsModel.getThemeColor(),
                settingsModel.getLogo(),
                settingsModel.getFileName()
        );
    }

    public SettingsModel toEntity(SettingsDTO settingsDTO) {

        if (settingsDTO == null) {
            return null;
        }

        SettingsModel settingsModel = new SettingsModel();
        if (settingsDTO.id() != null) {
            settingsModel.setId(settingsDTO.id());
        }
        settingsModel.setLogo(settingsDTO.logo());
        settingsModel.setName(settingsDTO.name());
        settingsModel.setThemeColor(settingsDTO.themeColor());
        settingsModel.setFileName(settingsDTO.fileName());
        return settingsModel;
    }

}
