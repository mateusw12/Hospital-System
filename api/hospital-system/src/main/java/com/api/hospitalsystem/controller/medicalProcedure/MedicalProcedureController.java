package com.api.hospitalsystem.controller.medicalProcedure;

import com.api.hospitalsystem.dto.medicalProcedure.MedicalProcedureDTO;
import com.api.hospitalsystem.service.medicalProcedure.MedicalProcedureService;
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
@RequestMapping("api/cadastro/procedimento")
@Tag(name = "Cadastro de procedimentos médicos")
public class MedicalProcedureController {

    @Autowired
    private MedicalProcedureService medicalProcedureService;

    @GetMapping
    @Operation(summary = "Consulta todos os procedimentos médicos")
    public @ResponseBody List<MedicalProcedureDTO> findAll() {
        return medicalProcedureService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta procedimento médico por código")
    public MedicalProcedureDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return medicalProcedureService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um procedimento médico")
    @ResponseStatus(code = HttpStatus.CREATED)
    public MedicalProcedureDTO create(@RequestBody @Valid @NotNull MedicalProcedureDTO medicalProcedureDTO) {
        return medicalProcedureService.create(medicalProcedureDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um procedimento médico")
    public MedicalProcedureDTO update(@PathVariable @NotNull @Positive Long id,
                                      @RequestBody @Valid @NotNull MedicalProcedureDTO medicalProcedureDTO) {
        return medicalProcedureService.update(id, medicalProcedureDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um procedimento médico")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        medicalProcedureService.delete(id);
    }

}
