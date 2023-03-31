package com.api.hospitalsystem.model.user;

import com.api.hospitalsystem.converter.role.RoleConverter;
import com.api.hospitalsystem.converter.specialization.SpecializationConverter;
import com.api.hospitalsystem.model.medicalProcedure.MedicalProcedureModel;
import com.api.hospitalsystem.model.role.Role;
import com.api.hospitalsystem.model.specialization.Specialization;
import com.api.hospitalsystem.utils.decorator.crm.Crm;
import com.api.hospitalsystem.utils.decorator.medicalProcedure.MedicalProcedure;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "usuario")
@Data
public class UserModel implements Serializable {

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
    @Length(max = 200)
    @Column(name="nomeUsuario", nullable = false, length = 200)
    public String userName;

    @Crm
    @Length(max = 200)
    @Column(name="crm", length = 200)
    public String crm;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name="senha", nullable = false, length = 200)
    public String password;

    @Column(name = "ativo")
    public Boolean isActive;

    @Convert(converter = RoleConverter.class)
    @NotNull
    @Column(name="perfil", nullable = false, length = 100)
    public Role role;

    @Email
    @NotNull
    @NotBlank
    @Length(max = 300)
    @Column(name="email", length = 300)
    public String email;

    @NotNull
    @Positive
    @Column(name="codHospital", nullable = false)
    public Long hospitalId;

    @Convert(converter = SpecializationConverter.class)
    @NotNull
    @Column(name="especializacao", nullable = false)
    public Specialization specialization;

    @MedicalProcedure
    @ManyToMany
    @JoinTable(
            name = "user_procedure",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "procedure_id"))
    private List<MedicalProcedureModel> procedures = new ArrayList<>();

}
