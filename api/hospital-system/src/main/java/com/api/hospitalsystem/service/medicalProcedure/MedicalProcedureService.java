package com.api.hospitalsystem.service.medicalProcedure;

import com.api.hospitalsystem.dto.medicalProcedure.MedicalProcedureDTO;
import com.api.hospitalsystem.mapper.medicalProcedure.MedicalProcedureMapper;
import com.api.hospitalsystem.mapper.user.UserMapper;
import com.api.hospitalsystem.repository.medicalProcedure.MedicalProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalProcedureService {

    @Autowired
    private MedicalProcedureRepository medicalProcedureRepository;

    @Autowired
    private MedicalProcedureMapper medicalProcedureMapper;

    @Autowired
    private UserMapper userMapper;

    @Transactional
    public List<MedicalProcedureDTO> findAll() {
        return medicalProcedureRepository.findAll()
                .stream()
                .map(medicalProcedureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MedicalProcedureDTO findById(Long id) {
        return medicalProcedureRepository.findById(id).map(medicalProcedureMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Medical Procedure not found" + id));
    }

    @Transactional
    public MedicalProcedureDTO create(MedicalProcedureDTO medicalProcedureDTO) {
        return medicalProcedureMapper.toDTO(medicalProcedureRepository.save(medicalProcedureMapper.toEntity(medicalProcedureDTO)));
    }

    @Transactional
    public MedicalProcedureDTO update(Long id, MedicalProcedureDTO medicalProcedureDTO) {
        return medicalProcedureRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setDescription(medicalProcedureDTO.description());
                    recordFound.setName(medicalProcedureDTO.name());
                    recordFound.setPrice(medicalProcedureDTO.price());
                    recordFound.setDoctors(
                            medicalProcedureDTO.doctors()
                                    .stream()
                                    .map(userMapper::toEntity)
                                    .collect(Collectors.toList()));
                    return medicalProcedureMapper.toDTO(medicalProcedureRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Medical Procedure not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        medicalProcedureRepository.delete(medicalProcedureRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medical Procedure not found" + id)));
    }

}
