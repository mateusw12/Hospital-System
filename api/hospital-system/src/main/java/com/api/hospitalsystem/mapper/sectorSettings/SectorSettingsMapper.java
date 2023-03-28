package com.api.hospitalsystem.mapper.sectorSettings;

import com.api.hospitalsystem.dto.sectorSettings.SectorSettingsDTO;
import com.api.hospitalsystem.model.sectorSettings.SectorSettingsModel;
import org.springframework.stereotype.Component;

@Component
public class SectorSettingsMapper {

    public SectorSettingsDTO toDTO(SectorSettingsModel sectorSettingsModel) {
        if (sectorSettingsModel == null) {
            return null;
        }
        return new SectorSettingsDTO(
                sectorSettingsModel.getId(),
                sectorSettingsModel.getSector(),
                sectorSettingsModel.getHospitalId(),
                sectorSettingsModel.getDailyPrice(),
                sectorSettingsModel.getHasHealthInsurance(),
                sectorSettingsModel.getBedNumber()
        );
    }

    public SectorSettingsModel toEntity(SectorSettingsDTO sectorSettingsDTO) {

        if (sectorSettingsDTO == null) {
            return null;
        }

        SectorSettingsModel sectorSettingsModel = new SectorSettingsModel();
        if (sectorSettingsDTO.id() != null) {
            sectorSettingsModel.setId(sectorSettingsDTO.id());
        }
        sectorSettingsModel.setSector(sectorSettingsDTO.sector());
        sectorSettingsModel.setHospitalId(sectorSettingsDTO.hospitalId());
        sectorSettingsModel.setHasHealthInsurance(sectorSettingsDTO.hasHealthInsurance());
        sectorSettingsModel.setDailyPrice(sectorSettingsDTO.dailyPrice());
        sectorSettingsModel.setBedNumber(sectorSettingsDTO.bedNumber());
        return sectorSettingsModel;
    }

}
