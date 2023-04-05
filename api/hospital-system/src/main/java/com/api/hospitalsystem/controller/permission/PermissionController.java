package com.api.hospitalsystem.controller.permission;

import com.api.hospitalsystem.dto.permission.PermissionDTO;
import com.api.hospitalsystem.service.permission.PermissionService;
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
@RequestMapping("api/menu/permissao")
@Tag(name = "Configuração de permissão")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping
    @Operation(summary = "Consulta todas as configurações de permissao")
    public @ResponseBody List<PermissionDTO> findAll() {
        return permissionService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta configuração de permissao por código")
    public PermissionDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return permissionService.findById(id);
    }

    @GetMapping("/user/{userName}")
    @Operation(summary = "Consulta todas as configuração de permissao por usuario")
    public List<PermissionDTO> findByUserName(@PathVariable @NotNull @NotBlank String userName) {
        return permissionService.findByUserName(userName);
    }

    @PostMapping
    @Operation(summary = "Cadastra uma configuração de permissao")
    @ResponseStatus(code = HttpStatus.CREATED)
    public PermissionDTO create(@RequestBody @Valid @NotNull PermissionDTO permissionDTO) {
        return permissionService.create(permissionDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma cofniguração de permissao")
    public PermissionDTO update(@PathVariable @NotNull @Positive Long id,
                                @RequestBody @Valid @NotNull PermissionDTO permissionDTO) {
        return permissionService.update(id, permissionDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma cofiguração de permissao")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        permissionService.delete(id);
    }

}
