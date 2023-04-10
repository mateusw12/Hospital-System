package com.api.hospitalsystem.mapper.hospital;

import com.api.hospitalsystem.dto.hospital.HospitalDTO;
import com.api.hospitalsystem.model.hospital.HospitalModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

@Component
public class HospitalMapper {

    public HospitalDTO toDTO(HospitalModel hospitalModel) {
        if (hospitalModel == null) {
            return null;
        }
        return new HospitalDTO(
                hospitalModel.getId(),
                hospitalModel.getName(),
                hospitalModel.getZipCode(),
                hospitalModel.getComercialName(),
                hospitalModel.getPhone(),
                hospitalModel.getIsActive()
        );
    }

    public HospitalModel toEntity(HospitalDTO hospitalDTO) {

        if (hospitalDTO == null) {
            return null;
        }

        HospitalModel hospitalModel = new HospitalModel();
        if (hospitalDTO.id() != null) {
            hospitalModel.setId(hospitalDTO.id());
        }
        hospitalModel.setName(hospitalDTO.name());
        hospitalModel.setComercialName(hospitalDTO.comercialName());
        hospitalModel.setIsActive(hospitalDTO.isActive());
        hospitalModel.setPhone(hospitalDTO.phone());
        hospitalModel.setZipCode(hospitalDTO.zipCode());
        return hospitalModel;
    }

}
