package com.api.hospitalsystem.repository.settings;

import com.api.hospitalsystem.model.settings.SettingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends JpaRepository<SettingsModel, Long> {
}
