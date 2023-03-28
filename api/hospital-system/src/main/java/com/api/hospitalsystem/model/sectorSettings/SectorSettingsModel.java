package com.api.hospitalsystem.model.sectorSettings;

import com.api.hospitalsystem.converter.sector.SectorConverter;
import com.api.hospitalsystem.model.sector.Sector;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;

@Entity(name = "configuracaoSetor")
@Data
public class SectorSettingsModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @Convert(converter = SectorConverter.class)
    @Column(name = "setor", nullable = false, unique = true)
    public Sector sector;

    @NotNull
    @Positive
    @Column(name = "codHospital", nullable = false)
    public Long hospitalId;

    @NotNull
    @PositiveOrZero
    @Column(name = "precoDiario", nullable = false)
    public Double dailyPrice;

    @Column(name = "planoSaude")
    public Boolean hasHealthInsurance;

    @NotNull
    @PositiveOrZero
    @Column(name = "numLeitos",nullable = false)
    public Long bedNumber;

}
