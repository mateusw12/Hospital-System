package com.api.hospitalsystem.configuration;

import com.api.hospitalsystem.model.role.Role;
import com.api.hospitalsystem.model.specialization.Specialization;
import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class DatabaseInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        UserModel userModel = userRepository.findByCrm("123546");

        if (userModel == null) {
            UserModel user = new UserModel();
            user.setUserName("mateus");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setName("Mateus");
            user.setEmail("mateus.walz@gmail.com");
            user.setSpecialization(Specialization.Surgeon);
            user.setRole(Role.Adm);
            user.setCrm("123546");
            user.setHospitalId(1L);
            user.setIsActive(true);
            userRepository.save(user);
        }
    }

}
