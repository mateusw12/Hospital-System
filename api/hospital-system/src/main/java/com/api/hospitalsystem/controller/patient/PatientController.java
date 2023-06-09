package com.api.hospitalsystem.controller.patient;

import com.api.hospitalsystem.dto.patient.PatientDTO;
import com.api.hospitalsystem.model.heathPlan.HeathPlan;
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

    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "Consulta todos os paciente")
    public @ResponseBody List<PatientDTO> findAll(@PathVariable @NotNull @Positive Long hospitalId) {
        return patientService.findAll(hospitalId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta paciente por código")
    public PatientDTO findById(@PathVariable @NotNull @Positive Long id) {
        return patientService.findById(id);
    }

    @GetMapping("heath-plan/{heathPlan}")
    @Operation(summary = "Consulta todos os paciente por plano de saúde")
    public @ResponseBody List<PatientDTO> findByHeathPlan(@PathVariable @NotNull HeathPlan heathPlan) {
        return patientService.findByHeathPlan(heathPlan);
    }

    @GetMapping("heath-plan")
    @Operation(summary = "Consulta todos os paciente que possuem plano de saúde")
    public @ResponseBody List<PatientDTO> findByHasHeathPlan() {
        return patientService.findByHasHeathPlan();
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
