package com.api.hospitalsystem.controller.user;

import com.api.hospitalsystem.dto.user.UserDTO;
import com.api.hospitalsystem.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("api/cadastro/usuario")
@Tag(name = "Cadastro de usuário")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Consulta todos os usuários")
    public @ResponseBody List<UserDTO> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta usuário por código")
    public UserDTO findById(@PathVariable @NotBlank @Positive Long id) {
        return userService.findById(id);
    }

    @GetMapping("/me/{user}")
    @Operation(summary = "Consulta usuário logado")
    public ResponseEntity<UserDTO> findMe(@PathVariable @NotBlank @NotNull String user) {
//        if(userCustomValidation.validadeLoggedUser(user)){
//            return ResponseEntity.ok(userService.findMe(user));
//        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    @Operation(summary = "Cadastra um usuário")
    @ResponseStatus(code = HttpStatus.CREATED)
    public UserDTO create(@RequestBody @Valid @NotNull UserDTO userDTO) {
        return userService.create(userDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um usuário")
    public UserDTO update(@PathVariable @NotNull @Positive Long id,
                          @RequestBody @Valid @NotNull UserDTO userDTO) {
        return userService.update(id, userDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um usuário")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        userService.delete(id);
    }

}
