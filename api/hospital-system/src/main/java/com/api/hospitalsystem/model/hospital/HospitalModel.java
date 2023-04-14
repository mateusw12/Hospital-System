package com.api.hospitalsystem.model.hospital;

import com.api.hospitalsystem.utils.decorator.cep.Cep;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity(name = "hospital")
@Data
public class HospitalModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "nome",nullable = false, length = 200)
    public String name;

    @Cep
    @Length(max = 20)
    @Column(name = "zipCode", length = 20)
    public String zipCode;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "nomeFantasia", length = 200)
    public String comercialName;

    @Length(max = 20)
    @Column(name = "telefone", length = 20)
    public String phone;

    @Column(name = "ativo")
    public Boolean isActive;

}
