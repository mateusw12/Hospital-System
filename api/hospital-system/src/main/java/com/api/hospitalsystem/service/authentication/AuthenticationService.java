package com.api.hospitalsystem.service.authentication;

import com.api.hospitalsystem.model.login.LoginModel;
import com.api.hospitalsystem.model.login.UserTokenModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import com.api.hospitalsystem.security.utils.JWTUtil;
import com.api.hospitalsystem.service.impl.user.DetailUserServiceImpl;
import com.api.hospitalsystem.validator.user.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthenticationService {

    @Autowired
    private DetailUserServiceImpl serviceMyUserDetail;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil serviceJWT;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserValidator userValidator;

    public ResponseEntity<UserTokenModel> authentication(LoginModel loginModel){
        userValidator.validateUserName(loginModel.getUserName());
        UserDetails userDetails = serviceMyUserDetail.loadUserByUsername(loginModel.getUserName());

        if (!passwordEncoder.matches(loginModel.getPassword(), userDetails.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String token = serviceJWT.generateToken(userDetails);
        return ResponseEntity.ok(buildUserToken(loginModel.getUserName(), token));
    }

    private UserTokenModel buildUserToken(String userName, String token) {
        Date expirationDate = serviceJWT.getExpirationTokenDate();

        UserTokenModel userTokenDTO = new UserTokenModel();
        userTokenDTO.userName = userName;
        userTokenDTO.token = token;
        userTokenDTO.expirationDate = expirationDate;
        return userTokenDTO;
    }

}
