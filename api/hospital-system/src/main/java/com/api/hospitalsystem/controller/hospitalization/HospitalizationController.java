package com.api.hospitalsystem.controller.hospitalization;

import com.api.hospitalsystem.dto.hospitalization.HospitalizationDTO;
import com.api.hospitalsystem.service.hospitalization.HospitalizationService;
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
@RequestMapping("api/cadastro/internacao")
@Tag(name = "Cadastro de internação")
public class HospitalizationController {

    @Autowired
    private HospitalizationService hospitalizationService;

    @GetMapping
    @Operation(summary = "Consulta todas as internação")
    public @ResponseBody List<HospitalizationDTO> findAll() {
        return hospitalizationService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta internação por código")
    public HospitalizationDTO findById(@PathVariable @NotNull @Positive Long id) {
        return hospitalizationService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra uma internação")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HospitalizationDTO create(@RequestBody @Valid @NotNull HospitalizationDTO hospitalizationDTO) {
        return hospitalizationService.create(hospitalizationDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma internação")
    public HospitalizationDTO update(@PathVariable @NotNull @Positive Long id,
                                     @RequestBody @Valid @NotNull HospitalizationDTO hospitalizationDTO) {
        return hospitalizationService.update(id, hospitalizationDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma internação")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        hospitalizationService.delete(id);
    }

}
