package com.api.hospitalsystem.repository.sectorSettings;

import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.model.sectorSettings.SectorSettingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorSettingsRepository extends JpaRepository<SectorSettingsModel, Long> {

    SectorSettingsModel findBySector(Sector sector);

}
