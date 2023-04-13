package com.api.hospitalsystem.controller.doctorAppointment;

import com.api.hospitalsystem.dto.doctorAppointment.DoctorAppointmentDTO;
import com.api.hospitalsystem.service.doctorAppointment.DoctorAppointmentService;
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
@RequestMapping("api/cadastro/consulta-medica")
@Tag(name = "Cadastro de consulta médica")
public class DoctorAppointmentController {

    @Autowired
    private DoctorAppointmentService doctorAppointmentService;

    @GetMapping
    @Operation(summary = "Consulta todos as consultas médicas")
    public @ResponseBody List<DoctorAppointmentDTO> findAll() {
        return doctorAppointmentService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta doneça por consultas médica")
    public DoctorAppointmentDTO findById(@PathVariable @NotNull @Positive Long id) {
        return doctorAppointmentService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Cadastra uma consultas médica")
    @ResponseStatus(code = HttpStatus.CREATED)
    public DoctorAppointmentDTO create(@RequestBody @Valid @NotNull DoctorAppointmentDTO doctorAppointmentDTO) {
        return doctorAppointmentService.create(doctorAppointmentDTO);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma consultas médica")
    public DoctorAppointmentDTO update(@PathVariable @NotNull @Positive Long id,
                                       @RequestBody @Valid @NotNull DoctorAppointmentDTO doctorAppointmentDTO) {
        return doctorAppointmentService.update(id, doctorAppointmentDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma consultas médica")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        doctorAppointmentService.delete(id);
    }

}
