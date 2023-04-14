package com.api.hospitalsystem.model.patient;

import com.api.hospitalsystem.converter.gender.GenderConverter;
import com.api.hospitalsystem.converter.heathPlan.HeathPlanConverter;
import com.api.hospitalsystem.converter.maritalStatus.MaritalStatusConverter;
import com.api.hospitalsystem.model.gender.Gender;
import com.api.hospitalsystem.model.heathPlan.HeathPlan;
import com.api.hospitalsystem.model.maritalStatus.MaritalStatus;
import com.api.hospitalsystem.utils.decorator.cep.Cep;
import com.api.hospitalsystem.utils.decorator.cpf.Cpf;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;

@Entity(name = "paciente")
@Data
public class PatientModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="nome", nullable = false, length = 200)
    public String name;

    @NotNull
    @NotBlank
    @Cpf
    @Length(max = 11)
    @Column(name="cpf", nullable = false, length = 11)
    public String cpf;

    @Convert(converter = HeathPlanConverter.class)
    @Column(name="planoSaude", length = 200)
    public HeathPlan heathPlan;

    @Length(max = 200)
    @Column(name="email", length = 200)
    public String email;

    @NotNull
    @NotBlank
    @Length(max = 20)
    @Column(name="telefone", length = 20)
    public String phone;

    @NotNull
    @NotBlank
    @Cep
    @Length(max = 20)
    @Column(name="cep",nullable = false, length = 20)
    public String zipCode;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="endereco",nullable = false, length = 200)
    public String street;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="bairro",nullable = false, length = 200)
    public String district;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="cidade",nullable = false, length = 200)
    public String city;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="estado",nullable = false, length = 200)
    public String state;

    @NotNull
    @PositiveOrZero
    @Column(name="numeroCasa", nullable = false)
    public Long houseNumber;

    @NotNull
    @Positive
    @Column(name="idade", nullable = false)
    public Long age;

    @NotNull
    @Convert(converter = GenderConverter.class)
    @Column(name="genero", nullable = false)
    public Gender gender;

    @NotNull
    @Convert(converter = MaritalStatusConverter.class)
    @Column(name="estadoCivil", nullable = false)
    public MaritalStatus maritalStatus;

    @Column(name="temPlanoSaude")
    public Boolean hasHeathPlan;

    @NotNull
    @Positive
    @Column(name="codHospital")
    public Long hospitalId;

}
