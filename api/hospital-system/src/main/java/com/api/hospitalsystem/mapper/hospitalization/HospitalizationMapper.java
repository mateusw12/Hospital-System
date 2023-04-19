package com.api.hospitalsystem.mapper.hospitalization;

import com.api.hospitalsystem.dto.hospitalization.HospitalizationDTO;
import com.api.hospitalsystem.model.hospitalization.HospitalizationModel;
import org.springframework.stereotype.Component;

@Component
public class HospitalizationMapper {

    public HospitalizationDTO toDTO(HospitalizationModel hospitalizationModel) {
        if (hospitalizationModel == null) {
            return null;
        }
        return new HospitalizationDTO(
                hospitalizationModel.getId(),
                hospitalizationModel.getDoctorAppointmentId(),
                hospitalizationModel.getInitialSector(),
                hospitalizationModel.getHospitalizationDate(),
                hospitalizationModel.getTotalDays(),
                hospitalizationModel.getIsFinished(),
                hospitalizationModel.getDescription()
        );
    }

    public HospitalizationModel toEntity(HospitalizationDTO hospitalizationDTO) {

        if (hospitalizationDTO == null) {
            return null;
        }

        HospitalizationModel hospitalizationModel = new HospitalizationModel();
        if (hospitalizationDTO.id() != null) {
            hospitalizationModel.setId(hospitalizationDTO.id());
        }
        hospitalizationModel.setHospitalizationDate(hospitalizationDTO.hospitalizationDate());
        hospitalizationModel.setDoctorAppointmentId(hospitalizationDTO.doctorAppointmentId());
        hospitalizationModel.setInitialSector(hospitalizationDTO.initialSector());
        hospitalizationModel.setTotalDays(hospitalizationDTO.totalDays());
        hospitalizationModel.setIsFinished(hospitalizationDTO.isFinished());
        hospitalizationModel.setDescription(hospitalizationDTO.description());
        return hospitalizationModel;
    }

}
