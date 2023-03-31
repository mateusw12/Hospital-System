package com.api.hospitalsystem.controller.authentication;

import com.api.hospitalsystem.model.login.LoginModel;
import com.api.hospitalsystem.model.login.UserTokenModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import com.api.hospitalsystem.security.utils.JWTUtil;
import com.api.hospitalsystem.service.impl.user.DetailUserServiceImpl;
import com.api.hospitalsystem.validator.user.UserValidator;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;

@Validated
@RestController
@RequestMapping("api/login")
@Tag(name = "Login")
public class AuthenticationController {

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

    @PostMapping()
    public ResponseEntity<UserTokenModel> login(@RequestBody @Valid LoginModel loginDTO) {
        userValidator.validateUserName(loginDTO.getUserName());
        UserDetails userDetails = serviceMyUserDetail.loadUserByUsername(loginDTO.getUserName());

        if (!passwordEncoder.matches(loginDTO.getPassword(), userDetails.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String token = serviceJWT.generateToken(userDetails);
        return ResponseEntity.ok(buildUserToken(loginDTO.getUserName(), token));
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
