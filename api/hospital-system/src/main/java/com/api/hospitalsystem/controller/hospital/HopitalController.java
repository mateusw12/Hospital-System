package com.api.hospitalsystem.controller.hospital;

import com.api.hospitalsystem.dto.hospital.HospitalDTO;
import com.api.hospitalsystem.service.hospital.HospitalService;
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
@RequestMapping("api/cadastro/hospital")
@Tag(name = "Cadastro de hospital")
public class HopitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping
    @Operation(summary = "Consulta todos os hospitais")
    public @ResponseBody List<HospitalDTO> findAll() {
        return hospitalService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta hospitais por código")
    public HospitalDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return hospitalService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um hospitais")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HospitalDTO create(@RequestBody @Valid @NotNull HospitalDTO hospitalDTO) {
        return hospitalService.create(hospitalDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um hospitais")
    public HospitalDTO update(@PathVariable @NotNull @Positive Long id,
                              @RequestBody @Valid @NotNull HospitalDTO hospitalDTO) {
        return hospitalService.update(id, hospitalDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um hospitais")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        hospitalService.delete(id);
    }


}
