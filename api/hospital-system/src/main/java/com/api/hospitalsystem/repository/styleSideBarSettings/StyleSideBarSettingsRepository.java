package com.api.hospitalsystem.repository.styleSideBarSettings;

import com.api.hospitalsystem.model.styleSideBarSettings.StyleSideBarSettingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StyleSideBarSettingsRepository extends JpaRepository<StyleSideBarSettingsModel, Long> {
}
