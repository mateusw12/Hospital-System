package com.api.hospitalsystem.service.hospital;

import com.api.hospitalsystem.dto.hospital.HospitalDTO;
import com.api.hospitalsystem.mapper.hospital.HospitalMapper;
import com.api.hospitalsystem.repository.hospital.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private HospitalMapper hospitalMapper;

    @Transactional
    public List<HospitalDTO> findAll() {
        return hospitalRepository.findAll()
                .stream()
                .map(hospitalMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public HospitalDTO findById(Long id) {
        return hospitalRepository.findById(id).map(hospitalMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Hospital not found" + id));
    }

    @Transactional
    public HospitalDTO create(HospitalDTO hospitalDTO) {
        return hospitalMapper.toDTO(hospitalRepository.save(hospitalMapper.toEntity(hospitalDTO)));
    }

    @Transactional
    public HospitalDTO update(Long id, HospitalDTO hospitalDTO) {
        return hospitalRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(hospitalDTO.name());
                    recordFound.setZipCode(hospitalDTO.zipCode());
                    recordFound.setPhone(hospitalDTO.phone());
                    recordFound.setIsActive(hospitalDTO.isActive());
                    recordFound.setComercialName(hospitalDTO.comercialName());
                    return hospitalMapper.toDTO(hospitalRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Hospital not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        hospitalRepository.delete(hospitalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hospital not found" + id)));
    }

}
