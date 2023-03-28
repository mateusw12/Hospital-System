package com.api.hospitalsystem.service.hospitalization;

import com.api.hospitalsystem.dto.hospitalization.HospitalizationDTO;
import com.api.hospitalsystem.mapper.hospitalization.HospitalizationMapper;
import com.api.hospitalsystem.model.hospitalizationHistoric.HospitalizationHistoricModel;
import com.api.hospitalsystem.repository.hospitalization.HospitalizationRepository;
import com.api.hospitalsystem.repository.hospitalizationHistoric.HospitalizationHistoricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalizationService {

    @Autowired
    private HospitalizationRepository hospitalizationRepository;

    @Autowired
    private HospitalizationHistoricRepository hospitalizationHistoricRepository;

    @Autowired
    private HospitalizationMapper hospitalizationMapper;

    @Transactional
    public List<HospitalizationDTO> findAll() {
        return hospitalizationRepository.findAll()
                .stream()
                .map(hospitalizationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public HospitalizationDTO findById(Long id) {
        return hospitalizationRepository.findById(id).map(hospitalizationMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization not found" + id));
    }

    @Transactional
    public HospitalizationDTO create(HospitalizationDTO hospitalizationDTO) {
        hospitalizationHistoricRepository.save(getHospitalizationHistoricModel(hospitalizationDTO));
        return hospitalizationMapper.toDTO(hospitalizationRepository.save(hospitalizationMapper.toEntity(hospitalizationDTO)));
    }

    @Transactional
    public HospitalizationDTO update(Long id, HospitalizationDTO hospitalizationDTO) {
        return hospitalizationRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setId(hospitalizationDTO.id());
                    recordFound.setDoctorAppointmentId(hospitalizationDTO.doctorAppointmentId());
                    recordFound.setHospitalizationDate(hospitalizationDTO.hospitalizationDate());
                    recordFound.setInitialSector(hospitalizationDTO.initialSector());
                    recordFound.setTotalDays(hospitalizationDTO.totalDays());
                    recordFound.setIsFinished(hospitalizationDTO.isFinished());
                    return hospitalizationMapper.toDTO(hospitalizationRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Hospitalization not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        hospitalizationHistoricRepository.delete(hospitalizationHistoricRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization Historic not found" + id)));

        hospitalizationRepository.delete(hospitalizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization not found" + id)));
    }

    private HospitalizationHistoricModel getHospitalizationHistoricModel(HospitalizationDTO hospitalizationDTO){
        HospitalizationHistoricModel model = new HospitalizationHistoricModel();
        model.setCurrentSector(hospitalizationDTO.initialSector());
        model.setHospitalizationId(hospitalizationDTO.id());
        model.setDays(1L);
        return model;
    }

}
