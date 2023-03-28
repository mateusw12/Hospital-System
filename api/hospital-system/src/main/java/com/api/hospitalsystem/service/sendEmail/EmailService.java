package com.api.hospitalsystem.service.sendEmail;

import com.api.hospitalsystem.dto.sendEmail.EmailDTO;
import com.api.hospitalsystem.mapper.sendEmail.EmailMapper;
import com.api.hospitalsystem.model.sendEmail.EmailModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailMapper emailMapper;

    public EmailDTO sendEmail(EmailDTO emailDTO) throws MessagingException {
        EmailModel emailModel = emailMapper.toEntity(emailDTO);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(emailModel.getRecipient());
        helper.setSubject(emailModel.getSubject());
        helper.setText(emailModel.getBody(), true);

        mailSender.send(mimeMessage);
        return emailDTO;
    }

}
