package com.api.hospitalsystem.model.medicalProcedure;

import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.utils.decorator.doctors.Doctors;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "procedimentos")
public class MedicalProcedureModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @NotBlank
    @Length(max = 255)
    @Column(name = "nome", nullable = false)
    private String name;

    @NotNull
    @NotBlank
    @Length(max = 2000)
    @Column(name = "descricao",nullable = false, length = 2000)
    private String description;

    @NotNull
    @PositiveOrZero
    @Column(name = "preco", nullable = false)
    private Double price;

    @Doctors
    @ManyToMany(mappedBy = "procedures")
    private List<UserModel> doctors = new ArrayList<>();

}
