package com.api.hospitalsystem.service.settings;

import com.api.hospitalsystem.dto.settings.SettingsDTO;
import com.api.hospitalsystem.mapper.settings.SettingsMapper;
import com.api.hospitalsystem.model.settings.SettingsModel;
import com.api.hospitalsystem.repository.settings.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SettingService {

    @Autowired
    private SettingsRepository settingsRepository;

    @Autowired
    private SettingsMapper settingsMapper;

    @Transactional
    public SettingsDTO findAll() {
        List<SettingsModel> settingModels = settingsRepository.findAll();
        return settingsMapper.toDTO(settingModels.get(0));
    }

    @Transactional
    public SettingsDTO create(SettingsDTO settingDTO) {
        settingsRepository.deleteAll();
        return settingsMapper.toDTO(settingsRepository.save(settingsMapper.toEntity(settingDTO)));
    }

    @Transactional
    public void delete(Long id) {
        settingsRepository.delete(settingsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Settings not found" + id)));
    }

    @Transactional
    public SettingsDTO update(Long id, SettingsDTO settingDTO) {
        return settingsRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(settingDTO.name());
                    recordFound.setThemeColor(settingDTO.themeColor());
                    recordFound.setLogo(settingDTO.logo());
                    return settingsMapper.toDTO(settingsRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Settings not found" + id));
    }

}
