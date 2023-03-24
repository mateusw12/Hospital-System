package com.api.hospitalsystem.repository.patient;

import com.api.hospitalsystem.model.patient.PatientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<PatientModel, Long> {
}
