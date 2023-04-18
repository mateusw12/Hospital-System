package com.api.hospitalsystem.mapper.doctorAppointment;

import com.api.hospitalsystem.dto.doctorAppointment.DoctorAppointmentDTO;
import com.api.hospitalsystem.model.doctorAppointment.DoctorAppointmentModel;
import org.springframework.stereotype.Component;

@Component
public class DoctorAppointmentMapper {

    public DoctorAppointmentDTO toDTO(DoctorAppointmentModel doctorAppointmentModel) {
        if (doctorAppointmentModel == null) {
            return null;
        }
        return new DoctorAppointmentDTO(
                doctorAppointmentModel.getId(),
                doctorAppointmentModel.getUserName(),
                doctorAppointmentModel.getPatientId(),
                doctorAppointmentModel.getHospitalId(),
                doctorAppointmentModel.getAppointmentDate(),
                doctorAppointmentModel.getObservation(),
                doctorAppointmentModel.getPrescription(),
                doctorAppointmentModel.getMedicalCertificate()
        );
    }

    public DoctorAppointmentModel toEntity(DoctorAppointmentDTO doctorAppointmentDTO) {

        if (doctorAppointmentDTO == null) {
            return null;
        }

        DoctorAppointmentModel doctorAppointmentModel = new DoctorAppointmentModel();
        if (doctorAppointmentDTO.id() != null) {
            doctorAppointmentModel.setId(doctorAppointmentDTO.id());
        }
        doctorAppointmentModel.setAppointmentDate(doctorAppointmentDTO.appointmentDate());
        doctorAppointmentModel.setObservation(doctorAppointmentDTO.observation());
        doctorAppointmentModel.setPatientId(doctorAppointmentDTO.patientId());
        doctorAppointmentModel.setHospitalId(doctorAppointmentDTO.hospitalId());
        doctorAppointmentModel.setMedicalCertificate(doctorAppointmentDTO.medicalCertificate());
        doctorAppointmentModel.setPrescription(doctorAppointmentDTO.prescription());
        doctorAppointmentModel.setUserName(doctorAppointmentDTO.userName());
        return doctorAppointmentModel;
    }

}
