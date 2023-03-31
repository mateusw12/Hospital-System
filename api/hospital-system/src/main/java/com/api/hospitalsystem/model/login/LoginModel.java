package com.api.hospitalsystem.model.login;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class LoginModel implements Serializable {

    @NotNull
    @NotBlank
    @Length(max = 200)
    public String userName;

    @NotNull
    @NotBlank
    @Length(max = 200)
    public String password;

}
