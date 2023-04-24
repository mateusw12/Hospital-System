package com.api.hospitalsystem.controller.styleSIdeBarSettings;

import com.api.hospitalsystem.dto.styleSideBarSettings.StyleSideBarSettingsDTO;
import com.api.hospitalsystem.service.styleSideBarSettings.StyleSideBarSettinsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("api/configuracao/estilizacao/sidebar")
@Tag(name = "Cadastro de configuracao de estilização da barra lateral")
public class StyleSideBarSettingsController {

    @Autowired
    private StyleSideBarSettinsService styleSideBarSettinsService;

    @GetMapping("/{hospitalId}")
    @Operation(summary = "Lista somente uma configuração de estilização da barra lateral")
    public ResponseEntity<StyleSideBarSettingsDTO> findAll(@PathVariable @NotNull @Positive Long hospitalId) {
        StyleSideBarSettingsDTO settingDTO = styleSideBarSettinsService.findAll(hospitalId);
        return ResponseEntity.ok().body(settingDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra configuração de estilização da barra lateral")
    public StyleSideBarSettingsDTO create(@RequestBody @Valid StyleSideBarSettingsDTO styleSideBarSettingsDTO) {
        return styleSideBarSettinsService.create(styleSideBarSettingsDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui configuração de estilização da barra lateral")
    public ResponseEntity<StyleSideBarSettingsDTO> delete(@PathVariable @NotNull @Positive Long id) {
        styleSideBarSettinsService.delete(id);
        return ResponseEntity.ok().build();
    }

}
