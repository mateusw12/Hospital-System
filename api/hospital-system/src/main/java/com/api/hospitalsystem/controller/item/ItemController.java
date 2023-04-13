package com.api.hospitalsystem.controller.item;

import com.api.hospitalsystem.dto.item.ItemDTO;
import com.api.hospitalsystem.service.item.ItemService;
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
@RequestMapping("api/menu/item")
@Tag(name = "Cadastro de item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    @Operation(summary = "Consulta todos os itens")
    public @ResponseBody List<ItemDTO> findAll() {
        return itemService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta item por código")
    public ItemDTO findById(@PathVariable @NotNull @Positive Long id) {
        return itemService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um item")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ItemDTO create(@RequestBody @Valid @NotNull ItemDTO itemDTO) {
        return itemService.create(itemDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um item")
    public ItemDTO update(@PathVariable @NotNull @Positive Long id,
                          @RequestBody @Valid @NotNull ItemDTO itemDTO) {
        return itemService.update(id, itemDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um item")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        itemService.delete(id);
    }

}
