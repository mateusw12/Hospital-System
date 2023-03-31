package com.api.hospitalsystem.service.patient;

import com.api.hospitalsystem.dto.patient.PatientDTO;
import com.api.hospitalsystem.mapper.patient.PatientMapper;
import com.api.hospitalsystem.model.heathPlan.HeathPlan;
import com.api.hospitalsystem.repository.patient.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientMapper patientMapper;

    @Transactional
    public List<PatientDTO> findAll() {
        return patientRepository.findAll()
                .stream()
                .map(patientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientDTO findById(Long id) {
        return patientRepository.findById(id).map(patientMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found" + id));
    }

    @Transactional
    public List<PatientDTO> findByHeathPlan(HeathPlan heathPlan) {
        return patientRepository.findByHeathPlan(heathPlan)
                .stream()
                .map(patientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PatientDTO> findByHasHeathPlan() {
        return patientRepository.findByHasHeathPlan(true)
                .stream()
                .map(patientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientDTO create(PatientDTO patientDTO) {
        return patientMapper.toDTO(patientRepository.save(patientMapper.toEntity(patientDTO)));
    }

    @Transactional
    public PatientDTO update(Long id, PatientDTO patientDTO) {
        return patientRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(patientDTO.name());
                    recordFound.setMaritalStatus(patientDTO.maritalStatus());
                    recordFound.setEmail(patientDTO.email());
                    recordFound.setHouseNumber(patientDTO.houseNumber());
                    recordFound.setAge(patientDTO.age());
                    recordFound.setCep(patientDTO.cep());
                    recordFound.setGender(patientDTO.gender());
                    recordFound.setCity(patientDTO.city());
                    recordFound.setDistrict(patientDTO.district());
                    recordFound.setState(patientDTO.state());
                    recordFound.setStreet(patientDTO.street());
                    recordFound.setCpf(patientDTO.cpf());
                    recordFound.setHeathPlan(patientDTO.heathPlan());
                    recordFound.setHasHeathPlan(patientDTO.hasHeathPlan());
                    return patientMapper.toDTO(patientRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Patient not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        patientRepository.delete(patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found" + id)));
    }

}
