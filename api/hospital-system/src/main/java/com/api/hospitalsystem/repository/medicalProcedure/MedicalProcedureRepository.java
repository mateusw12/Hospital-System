package com.api.hospitalsystem.repository.medicalProcedure;

import com.api.hospitalsystem.model.medicalProcedure.MedicalProcedureModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalProcedureRepository extends JpaRepository<MedicalProcedureModel, Long>  {
}
