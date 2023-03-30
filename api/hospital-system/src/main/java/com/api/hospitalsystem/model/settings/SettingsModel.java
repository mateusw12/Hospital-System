package com.api.hospitalsystem.model.settings;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity(name = "configuracao")
public class SettingsModel implements Serializable {

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
    @Length(max = 50)
    @Column(name="corTema", length = 50)
    public String themeColor;

    @NotBlank
    @NotNull
    @Column(name="logotipo", columnDefinition = "VARCHAR(MAX)")
    public String logo;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name="nomeLogo", length = 200)
    public String fileName;

}
