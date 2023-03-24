package com.api.hospitalsystem.repository.hospital;

import com.api.hospitalsystem.model.hospital.HospitalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<HospitalModel, Long> {
}
