package com.api.hospitalsystem.model.permission;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@Data
@Entity(name = "permissao")
public class PermissionModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "usuario", nullable = false, length = 200)
    public String userName;

    @NotNull
    @Positive
    @Column(name = "codItem", nullable = false)
    public Long itemId;

}
