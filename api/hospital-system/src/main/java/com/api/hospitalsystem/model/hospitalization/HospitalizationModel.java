package com.api.hospitalsystem.model.hospitalization;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.utils.decorator.futureDate.FutureDate;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "internacao")
@Data
public class HospitalizationModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @Positive
    @Column(name = "codConsultaMedica", nullable = false)
    public Long doctorAppointmentId;

    @NotNull
    @Convert(converter = SectorConverter.class)
    @Column(name = "setorInicial", nullable = false)
    public Sector initialSector;

    @NotNull
    @FutureDate
    @Column(name = "dataInternacao", nullable = false)
    public Date hospitalizationDate;

    @NotNull
    @Positive
    @Column(name = "totalDias", nullable = false)
    public Long totalDays;

    @Column(name = "internacaoFinalizada")
    public Boolean isFinished;

}
