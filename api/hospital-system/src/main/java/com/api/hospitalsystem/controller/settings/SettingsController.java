package com.api.hospitalsystem.controller.settings;

import com.api.hospitalsystem.dto.settings.SettingsDTO;
import com.api.hospitalsystem.service.settings.SettingService;
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
@RequestMapping("api/cadastro/configuracao")
@Tag(name = "Cadastro de configuracao")
public class SettingsController {

    @Autowired
    private SettingService settingService;

    @GetMapping()
    @Operation(summary = "Lista somente uma configuração")
    public ResponseEntity<SettingsDTO> findAll() {
        SettingsDTO settingDTO = settingService.findAll();
        return ResponseEntity.ok().body(settingDTO);
    }

    @PostMapping
    @Operation(summary = "Cadastra configuração")
    public SettingsDTO create(@RequestBody @Valid SettingsDTO settingDTO) {
        return settingService.create(settingDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui configuração")
    public ResponseEntity<SettingsDTO> delete(@PathVariable @NotNull @Positive Long id) {
        settingService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza configuração")
    public SettingsDTO update(@PathVariable @NotNull @Positive Long id,
                             @RequestBody @Valid SettingsDTO settingDTO) {
        return settingService.update(id, settingDTO);
    }

}
