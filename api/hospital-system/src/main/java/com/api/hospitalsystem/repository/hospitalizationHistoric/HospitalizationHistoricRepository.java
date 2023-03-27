package com.api.hospitalsystem.repository.hospitalizationHistoric;

import com.api.hospitalsystem.model.hospitalizationHistoric.HospitalizationHistoricModel;
import com.api.hospitalsystem.model.sector.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalizationHistoricRepository extends JpaRepository<HospitalizationHistoricModel, Long> {

    List<HospitalizationHistoricModel> findByCurrentSector(Sector sector);

    List<HospitalizationHistoricModel> findByHospitalizationId(Long hospitalizationId);

}
