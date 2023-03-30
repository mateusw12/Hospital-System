package com.api.hospitalsystem.controller.sendSms;

import com.api.hospitalsystem.model.sendSms.SmsModel;
import com.api.hospitalsystem.service.sendSms.SmsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("api/envio-sms")
@Tag(name = "Envio de SMS")
public class SendSmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping
    @Operation(summary = "Envia sms")
    public ResponseEntity<SmsModel> sendSMS(@RequestBody @Valid SmsModel sms) {
        smsService.sendSMS(sms);
        return ResponseEntity.ok().body(sms);
    }

}
