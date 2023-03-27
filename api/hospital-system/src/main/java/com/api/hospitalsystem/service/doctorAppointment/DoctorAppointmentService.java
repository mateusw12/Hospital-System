package com.api.hospitalsystem.service.doctorAppointment;

import com.api.hospitalsystem.dto.doctorAppointment.DoctorAppointmentDTO;
import com.api.hospitalsystem.mapper.doctorAppointment.DoctorAppointmentMapper;
import com.api.hospitalsystem.repository.doctorAppointment.DoctorAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorAppointmentService {

    @Autowired
    private DoctorAppointmentRepository doctorAppointmentRepository;

    @Autowired
    private DoctorAppointmentMapper doctorAppointmentMapper;

    @Transactional
    public List<DoctorAppointmentDTO> findAll() {
        return doctorAppointmentRepository.findAll()
                .stream()
                .map(doctorAppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DoctorAppointmentDTO findById(Long id) {
        return doctorAppointmentRepository.findById(id).map(doctorAppointmentMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Doctor Appointment not found" + id));
    }

    @Transactional
    public DoctorAppointmentDTO create(DoctorAppointmentDTO doctorAppointmentDTO) {
        return doctorAppointmentMapper.toDTO(doctorAppointmentRepository.save(doctorAppointmentMapper.toEntity(doctorAppointmentDTO)));
    }

    @Transactional
    public DoctorAppointmentDTO update(Long id, DoctorAppointmentDTO doctorAppointmentDTO) {
        return doctorAppointmentRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setUserName(doctorAppointmentDTO.userName());
                    recordFound.setAppointmentDate(doctorAppointmentDTO.appointmentDate());
                    recordFound.setObservation(doctorAppointmentDTO.observation());
                    recordFound.setMedicalCertificate(doctorAppointmentDTO.medicalCertificate());
                    recordFound.setPrescription(doctorAppointmentDTO.prescription());
                    recordFound.setHospitalId(doctorAppointmentDTO.hospitalId());
                    recordFound.setPatientName(doctorAppointmentDTO.patientName());
                    return doctorAppointmentMapper.toDTO(doctorAppointmentRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Doctor Appointment not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        doctorAppointmentRepository.delete(doctorAppointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor Appointment not found" + id)));
    }

}
