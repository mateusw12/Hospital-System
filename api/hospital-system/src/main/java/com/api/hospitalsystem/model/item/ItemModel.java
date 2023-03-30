package com.api.hospitalsystem.model.item;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity(name = "item")
public class ItemModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "descricao", nullable = false, length = 200)
    public String description;

    @Length(max = 200)
    @Column(name = "descricaoPai", nullable = false, length = 200)
    public String descriptionFather;

    @NotNull
    @NotBlank
    @Length(max = 200)
    @Column(name = "rotaItem", nullable = false, length = 200)
    public String onlyPath;

    @NotNull
    @NotBlank
    @Length(max = 300)
    @Column(name = "rota", nullable = false, length = 300)
    public String path;

    @Length(max = 200)
    @Column(name = "itemPai", nullable = false, length = 200)
    public String itemFather;

    @Column(name = "visivel", nullable = false)
    public Boolean visible;

}
