package com.api.hospitalsystem.mapper.sendEmail;

import com.api.hospitalsystem.dto.sendEmail.EmailDTO;
import com.api.hospitalsystem.model.sendEmail.EmailModel;
import org.springframework.stereotype.Component;

@Component
public class EmailMapper {

    public EmailDTO toDTO(EmailModel emailModel) {
        if (emailModel == null) {
            return null;
        }
        return new EmailDTO(
                emailModel.getBody(),
                emailModel.getRecipient(),
                emailModel.getSubject());
    }

    public EmailModel toEntity(EmailDTO emailDTO) {

        if (emailDTO == null) {
            return null;
        }

        EmailModel emailModel = new EmailModel();
        emailModel.setBody(emailDTO.body());
        emailModel.setRecipient(emailDTO.recipient());
        emailModel.setSubject(emailDTO.subject());
        return emailModel;
    }

}
