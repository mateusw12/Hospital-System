package com.api.hospitalsystem.service.hospitalizationHistoric;

import com.api.hospitalsystem.dto.hospitalizationHistoric.HospitalizationHistoricDTO;
import com.api.hospitalsystem.mapper.hospitalizationHistoric.HospitalizationHistoricMapper;
import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.repository.hospitalizationHistoric.HospitalizationHistoricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalizationHistoricService {

    @Autowired
    private HospitalizationHistoricRepository hospitalizationHistoricRepository;

    @Autowired
    private HospitalizationHistoricMapper hospitalizationHistoricMapper;

    @Transactional
    public List<HospitalizationHistoricDTO> findAll() {
        return hospitalizationHistoricRepository.findAll()
                .stream()
                .map(hospitalizationHistoricMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<HospitalizationHistoricDTO> findByHospitalizationId(Long hospitalizationId) {
        return hospitalizationHistoricRepository.findByHospitalizationId(hospitalizationId)
                .stream()
                .map(hospitalizationHistoricMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<HospitalizationHistoricDTO> findByCurrentSector(Sector sector) {
        return hospitalizationHistoricRepository.findByCurrentSector(sector)
                .stream()
                .map(hospitalizationHistoricMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public HospitalizationHistoricDTO findById(Long id) {
        return hospitalizationHistoricRepository.findById(id).map(hospitalizationHistoricMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization Historic not found" + id));
    }

    @Transactional
    public HospitalizationHistoricDTO create(HospitalizationHistoricDTO hospitalizationDTO) {
        return hospitalizationHistoricMapper.toDTO(hospitalizationHistoricRepository.save(hospitalizationHistoricMapper.toEntity(hospitalizationDTO)));
    }

    @Transactional
    public HospitalizationHistoricDTO update(Long id, HospitalizationHistoricDTO hospitalizationDTO) {
        return hospitalizationHistoricRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setId(hospitalizationDTO.id());
                    recordFound.setCurrentSector(hospitalizationDTO.currentSector());
                    recordFound.setHospitalizationId(hospitalizationDTO.hospitalizationId());
                    recordFound.setDays(hospitalizationDTO.days());
                    return hospitalizationHistoricMapper.toDTO(hospitalizationHistoricRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Hospitalization Historic not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        hospitalizationHistoricRepository.delete(hospitalizationHistoricRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization Historic not found" + id)));
    }

}
