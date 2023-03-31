package com.api.hospitalsystem.mapper.patient;

import com.api.hospitalsystem.dto.patient.PatientDTO;
import com.api.hospitalsystem.model.patient.PatientModel;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public PatientDTO toDTO(PatientModel patientModel) {
        if (patientModel == null) {
            return null;
        }
        return new PatientDTO(
                patientModel.getId(),
                patientModel.getName(),
                patientModel.getCpf(),
                patientModel.getHeathPlan(),
                patientModel.getEmail(),
                patientModel.getPhone(),
                patientModel.getCep(),
                patientModel.getStreet(),
                patientModel.getDistrict(),
                patientModel.getCity(),
                patientModel.getState(),
                patientModel.getHouseNumber(),
                patientModel.getAge(),
                patientModel.getGender(),
                patientModel.getMaritalStatus(),
                patientModel.getHasHeathPlan()
        );
    }

    public PatientModel toEntity(PatientDTO patientDTO) {

        if (patientDTO == null) {
            return null;
        }

        PatientModel patientModel = new PatientModel();
        if (patientDTO.id() != null) {
            patientModel.setId(patientDTO.id());
        }
        patientModel.setName(patientDTO.name());
        patientModel.setAge(patientDTO.age());
        patientModel.setEmail(patientDTO.email());
        patientModel.setCep(patientDTO.cep());
        patientModel.setState(patientDTO.state());
        patientModel.setDistrict(patientDTO.district());
        patientModel.setStreet(patientDTO.street());
        patientModel.setGender(patientDTO.gender());
        patientModel.setPhone(patientDTO.phone());
        patientModel.setCpf(patientDTO.cpf());
        patientModel.setHeathPlan(patientDTO.heathPlan());
        patientModel.setHouseNumber(patientDTO.houseNumber());
        patientModel.setMaritalStatus(patientDTO.maritalStatus());
        patientModel.setHasHeathPlan(patientDTO.hasHeathPlan());
        return patientModel;
    }

}
