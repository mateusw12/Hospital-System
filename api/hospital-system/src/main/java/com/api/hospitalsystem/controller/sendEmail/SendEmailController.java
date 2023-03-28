package com.api.hospitalsystem.controller.sendEmail;

import com.api.hospitalsystem.dto.sendEmail.EmailDTO;
import com.api.hospitalsystem.service.sendEmail.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("api/envio-email")
@Tag(name = "Envio de E-mail")
public class SendEmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    @Operation(summary = "Envia email")
    public EmailDTO sendEmail(@RequestBody @Valid EmailDTO emailDTO) throws MessagingException {
        return emailService.sendEmail(emailDTO);
    }

}