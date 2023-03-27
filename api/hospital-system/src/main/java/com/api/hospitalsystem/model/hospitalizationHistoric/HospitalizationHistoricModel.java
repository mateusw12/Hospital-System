package com.api.hospitalsystem.model.hospitalizationHistoric;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@Entity(name = "historicoInternacao")
@Data
public class HospitalizationHistoricModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @Positive
    @Column(name = "codInternacao", nullable = false)
    public Long hospitalizationId;

    @NotNull
    @Convert(converter = SectorConverter.class)
    @Column(name = "setorAtual", nullable = false)
    public Sector currentSector;

    @NotNull
    @Positive
    @Column(name = "dias", nullable = false)
    public Long days;

}
