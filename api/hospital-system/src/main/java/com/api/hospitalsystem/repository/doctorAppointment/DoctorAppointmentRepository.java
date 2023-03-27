package com.api.hospitalsystem.repository.doctorAppointment;

import com.api.hospitalsystem.model.doctorAppointment.DoctorAppointmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorAppointmentRepository extends JpaRepository<DoctorAppointmentModel, Long> {
}
