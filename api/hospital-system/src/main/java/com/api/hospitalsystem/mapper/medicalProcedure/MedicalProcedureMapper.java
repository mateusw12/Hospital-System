package com.api.hospitalsystem.mapper.medicalProcedure;

import com.api.hospitalsystem.dto.medicalProcedure.MedicalProcedureDTO;
import com.api.hospitalsystem.mapper.user.UserMapper;
import com.api.hospitalsystem.model.medicalProcedure.MedicalProcedureModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MedicalProcedureMapper {

    @Autowired
    private UserMapper userMapper;

    public MedicalProcedureDTO toDTO(MedicalProcedureModel medicalProcedureModel) {
        if (medicalProcedureModel == null) {
            return null;
        }
        return new MedicalProcedureDTO(
                medicalProcedureModel.getId(),
                medicalProcedureModel.getName(),
                medicalProcedureModel.getDescription(),
                medicalProcedureModel.getPrice(),
                medicalProcedureModel.getDoctors()
                        .stream()
                        .map(userMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    public MedicalProcedureModel toEntity(MedicalProcedureDTO permissionDTO) {

        if (permissionDTO == null) {
            return null;
        }

        MedicalProcedureModel medicalProcedureModel = new MedicalProcedureModel();
        if (permissionDTO.id() != null) {
            medicalProcedureModel.setId(permissionDTO.id());
        }
        medicalProcedureModel.setDescription(permissionDTO.description());
        medicalProcedureModel.setName(permissionDTO.name());
        medicalProcedureModel.setPrice(permissionDTO.price());
        medicalProcedureModel.setDoctors(
                permissionDTO.doctors()
                        .stream()
                        .map(userMapper::toEntity)
                        .collect(Collectors.toList()));
        return medicalProcedureModel;
    }

}
