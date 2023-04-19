package com.api.hospitalsystem.mapper.hospitalizationHistoric;

import com.api.hospitalsystem.dto.hospitalizationHistoric.HospitalizationHistoricDTO;
import com.api.hospitalsystem.model.hospitalizationHistoric.HospitalizationHistoricModel;
import org.springframework.stereotype.Component;

@Component
public class HospitalizationHistoricMapper {

    public HospitalizationHistoricDTO toDTO(HospitalizationHistoricModel hospitalizationHistoricModel) {
        if (hospitalizationHistoricModel == null) {
            return null;
        }
        return new HospitalizationHistoricDTO(
                hospitalizationHistoricModel.getId(),
                hospitalizationHistoricModel.getHospitalizationId(),
                hospitalizationHistoricModel.getCurrentSector(),
                hospitalizationHistoricModel.getDays(),
                hospitalizationHistoricModel.getDescription()
        );
    }

    public HospitalizationHistoricModel toEntity(HospitalizationHistoricDTO hospitalizationDTO) {

        if (hospitalizationDTO == null) {
            return null;
        }

        HospitalizationHistoricModel hospitalizationHistoricModel = new HospitalizationHistoricModel();
        if (hospitalizationDTO.id() != null) {
            hospitalizationHistoricModel.setId(hospitalizationDTO.id());
        }
        hospitalizationHistoricModel.setHospitalizationId(hospitalizationDTO.hospitalizationId());
        hospitalizationHistoricModel.setDays(hospitalizationDTO.days());
        hospitalizationHistoricModel.setCurrentSector(hospitalizationDTO.currentSector());
        hospitalizationHistoricModel.setDescription(hospitalizationDTO.description());
        return hospitalizationHistoricModel;
    }

}
