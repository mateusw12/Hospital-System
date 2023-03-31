package com.api.hospitalsystem.utils.decorator.doctors;

import com.api.hospitalsystem.model.medicalProcedure.MedicalProcedureModel;
import com.api.hospitalsystem.model.role.Role;
import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.nio.file.attribute.UserPrincipal;
import java.util.List;

@Component
public class DoctorsValidator implements ConstraintValidator<Doctors, List<UserModel>> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean isValid(List<UserModel> userModels, ConstraintValidatorContext context) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserPrincipal) {
                UserPrincipal userPrincipal = (UserPrincipal) principal;
                UserModel user = userRepository.findByUserName(userPrincipal.getName());
                if (user != null && user.getRole() == Role.Doctor) {
                    return userModels != null && !userModels.isEmpty();
                }
            }
         }
        return true;
    }

}
