package com.api.hospitalsystem.model.styleSideBarSettings;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@Data
@Entity(name = "configuracaoEstiloSideBar")
public class StyleSideBarSettingsModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    @NotNull
    @Positive
    @Column(name="codHospital", nullable = false)
    public Long hospitalId;

    @Length(max = 50)
    @Column(name="corBarraLateral", length = 50)
    public String onlyColorSideBar;

    @Length(max = 50)
    @Column(name="primeiraCorBarraLateral", length = 50)
    public String firstColorSideBar;

    @Length(max = 50)
    @Column(name="segundaCorBarraLateral", length = 50)
    public String secondColorSideBar;

    @Length(max = 50)
    @Column(name="direcaoGradiente", length = 50)
    public String directionGradient;

    @NotNull
    @NotBlank
    @Length(max = 50)
    @Column(name="corTextoBarraLateral", length = 50)
    public String colorTextSideBar;

    @NotNull
    @NotBlank
    @Length(max = 50)
    @Column(name="corBarraLateralMenu", length = 50)
    public String menuColorSideBar;

    @NotNull
    @NotBlank
    @Length(max = 50)
    @Column(name="corFocoBarraLateralMenu", length = 50)
    public String menuHoverColorSideBar;

    @Column(name="gradiente", length = 50)
    public Boolean isGradient;

}
