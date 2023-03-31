package com.api.hospitalsystem.repository.patient;

import com.api.hospitalsystem.model.heathPlan.HeathPlan;
import com.api.hospitalsystem.model.patient.PatientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<PatientModel, Long> {

    List<PatientModel> findByHeathPlan(HeathPlan heathPlan);
    List<PatientModel> findByHasHeathPlan(Boolean hasHeathPlan);

}
