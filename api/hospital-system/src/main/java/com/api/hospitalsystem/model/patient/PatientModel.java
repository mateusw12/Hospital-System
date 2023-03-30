package com.api.hospitalsystem.model.patient;

import com.api.hospitalsystem.converter.gender.GenderConverter;
import com.api.hospitalsystem.converter.maritalStatus.MaritalStatusConverter;
import com.api.hospitalsystem.model.gender.Gender;
import com.api.hospitalsystem.model.maritalStatus.MaritalStatus;
import com.api.hospitalsystem.utils.decorator.cep.Cep;
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

    @Length(max = 200)
    @Column(name="email", length = 200)
    public String email;

    @Length(max = 20)
    @Column(name="telefone", length = 20)
    public String phone;

    @NotNull
    @NotBlank
    @Cep
    @Length(max = 20)
    @Column(name="cep",nullable = false, length = 20)
    public String cep;

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

}
