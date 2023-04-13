package com.api.hospitalsystem.controller.sectorSettings;

import com.api.hospitalsystem.dto.sectorSettings.SectorSettingsDTO;
import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.service.sectorSettings.SectorSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("api/cadastro/configuracao-setor")
@Tag(name = "Cadastro de configuração do setor")
public class SectorSettingsController {

    @Autowired
    private SectorSettingsService sectorSettingsService;

    @GetMapping
    @Operation(summary = "Consulta todas as configurações de setores")
    public @ResponseBody List<SectorSettingsDTO> findAll() {
        return sectorSettingsService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta configuração de setor por código")
    public SectorSettingsDTO findById(@PathVariable @NotNull @Positive Long id) {
        return sectorSettingsService.findById(id);
    }

    @GetMapping("/sector/{sector}")
    @Operation(summary = "Consulta configuração por setor")
    public SectorSettingsDTO findBySector(@PathVariable @NotNull Sector sector) {
        return sectorSettingsService.findBySector(sector);
    }

    @PostMapping
    @Operation(summary = "Cadastra uma configuração de setor")
    @ResponseStatus(code = HttpStatus.CREATED)
    public SectorSettingsDTO create(@RequestBody @Valid @NotNull SectorSettingsDTO sectorSettingsDTO) {
        return sectorSettingsService.create(sectorSettingsDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma cofniguração de setor")
    public SectorSettingsDTO update(@PathVariable @NotNull @Positive Long id,
                                    @RequestBody @Valid @NotNull SectorSettingsDTO sectorSettingsDTO) {
        return sectorSettingsService.update(id, sectorSettingsDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma cofiguração de setor")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        sectorSettingsService.delete(id);
    }

}
