package com.api.hospitalsystem.model.disiase;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity(name = "doença")
public class DisiaseModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @NotBlank
    @Length(max = 300)
    @Column(name = "nome", nullable = false, length = 300)
    public String name;

    @NotNull
    @NotBlank
    @Length(max = 100)
    @Column(name = "cid", nullable = false, length = 100)
    public String cid;

}
