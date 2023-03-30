package com.api.hospitalsystem.model.doctorAppointment;

import com.api.hospitalsystem.utils.decorator.futureDate.FutureDate;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "consultaMedica")
@Data
public class DoctorAppointmentModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "medico", nullable = false, length = 200)
    public String userName;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "paciente", nullable = false, length = 200)
    public String patientName;

    @NotNull
    @Positive
    @Column(name = "codHospital", nullable = false)
    public Long hospitalId;

    @NotNull
    @FutureDate
    @Column(name = "dataConsulta", nullable = false)
    public Date appointmentDate;

    @NotNull
    @NotBlank
    @Length(max = 1000)
    @Column(name = "observação", nullable = false, length = 1000)
    public String observation;

    @NotNull
    @NotBlank
    @Length(max = 1000)
    @Column(name = "receita", nullable = false, length = 1000)
    public String prescription;

    @NotNull
    @Column(name = "atestadoMedico")
    public Boolean medicalCertificate;

}
