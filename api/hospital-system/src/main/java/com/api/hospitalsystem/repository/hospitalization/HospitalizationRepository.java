package com.api.hospitalsystem.repository.hospitalization;

import com.api.hospitalsystem.model.hospitalization.HospitalizationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalizationRepository extends JpaRepository<HospitalizationModel, Long> {
}
