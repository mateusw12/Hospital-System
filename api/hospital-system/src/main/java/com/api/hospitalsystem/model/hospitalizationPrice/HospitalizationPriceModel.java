package com.api.hospitalsystem.model.hospitalizationPrice;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "internacaoCusto")
@Data
public class HospitalizationPriceModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @Positive
    @Column(name = "codHospital", nullable = false)
    public Long hospitalId;

    @NotNull
    @Positive
    @Column(name = "codConsultaMedica", nullable = false)
    public Long doctorAppointmentId;

    @NotNull
    @PositiveOrZero
    @Column(name = "totalDias", nullable = false)
    public Long totalDays;

    @NotNull
    @PositiveOrZero
    @Column(name = "valorTotal", nullable = false)
    public Double totalValue;

    @Column(name = "pago")
    public Boolean isPayment;

    @NotNull
    @Column(name = "dataPagamento")
    public Date paymentDate;

}
