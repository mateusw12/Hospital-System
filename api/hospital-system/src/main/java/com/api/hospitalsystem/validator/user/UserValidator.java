package com.api.hospitalsystem.validator.user;

import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {

    @Autowired
    private UserRepository userRepository;

    public void validateUserName(String userName) {
        UserModel userModel = userRepository.findByUserName(userName);
        if(userModel == null) {
            throw new IllegalArgumentException(userName);
        }

        if(!userModel.getIsActive()){
            throw new IllegalArgumentException("Usuário inativo!");
        }
    }

}
