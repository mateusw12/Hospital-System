package com.api.hospitalsystem.controller.hospitalizationPrice;

import com.api.hospitalsystem.dto.hospitalizationPrice.HospitalizationPriceDTO;
import com.api.hospitalsystem.service.hospitalizationPrice.HospitalizationPriceService;
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
@RequestMapping("api/cadastro/internacao-custo")
@Tag(name = "Cadastro de custo de internação")
public class HospitalizationPriceController {

    @Autowired
    private HospitalizationPriceService hospitalizationPriceService;

    @GetMapping
    @Operation(summary = "Consulta todos os custo internação")
    public @ResponseBody List<HospitalizationPriceDTO> findAll() {
        return hospitalizationPriceService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta custo internação por código")
    public HospitalizationPriceDTO findById(@PathVariable @NotNull @Positive Long id) {
        return hospitalizationPriceService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra um custo de internação")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HospitalizationPriceDTO create(@RequestBody @Valid @NotNull HospitalizationPriceDTO hospitalizationPriceDTO) {
        return hospitalizationPriceService.create(hospitalizationPriceDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um custo de internação")
    public HospitalizationPriceDTO update(@PathVariable @NotNull @Positive Long id,
                                          @RequestBody @Valid @NotNull HospitalizationPriceDTO hospitalizationPriceDTO) {
        return hospitalizationPriceService.update(id, hospitalizationPriceDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um custo de internação")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        hospitalizationPriceService.delete(id);
    }

}
