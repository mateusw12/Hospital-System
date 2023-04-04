package com.api.hospitalsystem.controller.authentication;

import com.api.hospitalsystem.model.login.LoginModel;
import com.api.hospitalsystem.model.login.UserTokenModel;
import com.api.hospitalsystem.security.utils.TokenService;
import com.api.hospitalsystem.service.authentication.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("api/autenticacao")
@Tag(name = "Login/ Logout")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity<UserTokenModel> login(@RequestBody @Valid LoginModel loginModel) {
      return authenticationService.authentication(loginModel);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = tokenService.extractToken(request.getHeader("Authorization"));
        tokenService.addToBlacklist(token);
        return ResponseEntity.ok().build();
    }

}
