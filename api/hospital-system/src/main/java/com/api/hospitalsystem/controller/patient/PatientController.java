package com.api.hospitalsystem.controller.patient;

import com.api.hospitalsystem.dto.patient.PatientDTO;
import com.api.hospitalsystem.service.patient.PatientService;
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
@RequestMapping("api/cadastro/paciente")
@Tag(name = "Cadastro de paciente")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    @Operation(summary = "Consulta todos os paciente")
    public @ResponseBody List<PatientDTO> findAll() {
        return patientService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta paciente por código")
    public PatientDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return patientService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um paciente")
    @ResponseStatus(code = HttpStatus.CREATED)
    public PatientDTO create(@RequestBody @Valid @NotNull PatientDTO patientDTO) {
        return patientService.create(patientDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um paciente")
    public PatientDTO update(@PathVariable @NotNull @Positive Long id,
                             @RequestBody @Valid @NotNull PatientDTO patientDTO) {
        return patientService.update(id, patientDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um paciente")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        patientService.delete(id);
    }

}
