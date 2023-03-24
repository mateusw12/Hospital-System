package com.api.hospitalsystem.controller.disiase;

import com.api.hospitalsystem.dto.disiase.DisiaseDTO;
import com.api.hospitalsystem.service.disiase.DisiaseService;
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
@RequestMapping("api/cadastro/doencas")
@Tag(name = "Cadastro de doenças")
public class DisiaseController {

    @Autowired
    private DisiaseService disiaseService;

    @GetMapping
    @Operation(summary = "Consulta todos as doenças")
    public @ResponseBody List<DisiaseDTO> findAll() {
        return disiaseService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta doneça por código")
    public DisiaseDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return disiaseService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra uma doença")
    @ResponseStatus(code = HttpStatus.CREATED)
    public DisiaseDTO create(@RequestBody @Valid @NotNull DisiaseDTO disiaseDTO) {
        return disiaseService.create(disiaseDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma doença")
    public DisiaseDTO update(@PathVariable @NotNull @Positive Long id,
                             @RequestBody @Valid @NotNull DisiaseDTO disiaseDTO) {
        return disiaseService.update(id, disiaseDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma doença")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        disiaseService.delete(id);
    }

}
