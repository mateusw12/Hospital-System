package com.api.hospitalsystem.service.sectorSettings;

import com.api.hospitalsystem.dto.sectorSettings.SectorSettingsDTO;
import com.api.hospitalsystem.mapper.sectorSettings.SectorSettingsMapper;
import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.repository.sectorSettings.SectorSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectorSettingsService {

    @Autowired
    private SectorSettingsRepository sectorSettingsRepository;

    @Autowired
    private SectorSettingsMapper sectorSettingsMapper;

    @Transactional
    public List<SectorSettingsDTO> findAll() {
        return sectorSettingsRepository.findAll()
                .stream()
                .map(sectorSettingsMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SectorSettingsDTO findById(Long id) {
        return sectorSettingsRepository.findById(id).map(sectorSettingsMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Sector settings not found" + id));
    }

    @Transactional
    public SectorSettingsDTO findBySector(Sector sector) {
        return sectorSettingsMapper.toDTO(sectorSettingsRepository.findBySector(sector));
    }

    @Transactional
    public SectorSettingsDTO create(SectorSettingsDTO sectorSettingsDTO) {
        return sectorSettingsMapper.toDTO(sectorSettingsRepository.save(sectorSettingsMapper.toEntity(sectorSettingsDTO)));
    }

    @Transactional
    public SectorSettingsDTO update(Long id, SectorSettingsDTO userDTO) {
        return sectorSettingsRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setBedNumber(userDTO.bedNumber());
                    recordFound.setDailyPrice(userDTO.dailyPrice());
                    recordFound.setHasHealthInsurance(userDTO.hasHealthInsurance());
                    recordFound.setHospitalId(userDTO.hospitalId());
                    recordFound.setSector(userDTO.sector());
                    return sectorSettingsMapper.toDTO(sectorSettingsRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Sector settings not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        sectorSettingsRepository.delete(sectorSettingsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sector settings not found" + id)));
    }

}
