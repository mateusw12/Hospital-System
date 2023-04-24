package com.api.hospitalsystem.service.styleSideBarSettings;

import com.api.hospitalsystem.dto.styleSideBarSettings.StyleSideBarSettingsDTO;
import com.api.hospitalsystem.mapper.styleSideBarSettings.StyleSideBarSettingsMapper;
import com.api.hospitalsystem.model.styleSideBarSettings.StyleSideBarSettingsModel;
import com.api.hospitalsystem.repository.styleSideBarSettings.StyleSideBarSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class StyleSideBarSettinsService {

    @Autowired
    private StyleSideBarSettingsRepository styleSideBarSettingsRepository;

    @Autowired
    private StyleSideBarSettingsMapper styleSideBarSettingsMapper;

    @Transactional
    public StyleSideBarSettingsDTO findAll(Long hospitalId) {
        List<StyleSideBarSettingsModel> styleSideBarSettingsModels = styleSideBarSettingsRepository.findAll()
                .stream()
                .filter(el -> el.getHospitalId() == hospitalId)
                .toList();
        return styleSideBarSettingsMapper.toDTO(styleSideBarSettingsModels.get(0));
    }

    @Transactional
    public StyleSideBarSettingsDTO create(StyleSideBarSettingsDTO styleSideBarSettingsDTO) {
        styleSideBarSettingsRepository.deleteAll();
        return styleSideBarSettingsMapper.toDTO(styleSideBarSettingsRepository.save(styleSideBarSettingsMapper.toEntity(styleSideBarSettingsDTO)));
    }

    @Transactional
    public void delete(Long id) {
        styleSideBarSettingsRepository.delete(styleSideBarSettingsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Style Side Bar Settings not found" + id)));
    }

}
