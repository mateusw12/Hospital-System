package com.api.hospitalsystem.controller.hospitalizationHistoric;

import com.api.hospitalsystem.dto.hospitalizationHistoric.HospitalizationHistoricDTO;
import com.api.hospitalsystem.model.sector.Sector;
import com.api.hospitalsystem.service.hospitalizationHistoric.HospitalizationHistoricService;
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
@RequestMapping("api/cadastro/internacao-historico")
@Tag(name = "Cadastro de histórico de internação")
public class HospitalizationHistoricController {

    @Autowired
    private HospitalizationHistoricService hospitalizationHistoricService;

    @GetMapping
    @Operation(summary = "Consulta todas os históricos internação")
    public @ResponseBody List<HospitalizationHistoricDTO> findAll() {
        return hospitalizationHistoricService.findAll();
    }

    @GetMapping("/sector/{sector}")
    @Operation(summary = "Consulta todas os históricos internação por setor")
    public @ResponseBody List<HospitalizationHistoricDTO> findByCurrentSector(@PathVariable @NotNull Sector sector) {
        return hospitalizationHistoricService.findByCurrentSector(sector);
    }

    @GetMapping("/internação/{hospitalizationId}")
    @Operation(summary = "Consulta todas os históricos internação por código da internação")
    public @ResponseBody List<HospitalizationHistoricDTO> findByHospitalizationId(@PathVariable @NotNull @Positive Long hospitalizationId) {
        return hospitalizationHistoricService.findByHospitalizationId(hospitalizationId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta históricos internação por código")
    public HospitalizationHistoricDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return hospitalizationHistoricService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um históricos de internação")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HospitalizationHistoricDTO create(@RequestBody @Valid @NotNull HospitalizationHistoricDTO hospitalizationDTO) {
        return hospitalizationHistoricService.create(hospitalizationDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um históricos de internação")
    public HospitalizationHistoricDTO update(@PathVariable @NotNull @Positive Long id,
                                             @RequestBody @Valid @NotNull HospitalizationHistoricDTO hospitalizationDTO) {
        return hospitalizationHistoricService.update(id, hospitalizationDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um históricos de internação")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        hospitalizationHistoricService.delete(id);
    }

}
