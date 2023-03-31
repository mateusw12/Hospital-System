package com.api.hospitalsystem.configuration.general;

import com.api.hospitalsystem.model.hospital.HospitalModel;
import com.api.hospitalsystem.model.role.Role;
import com.api.hospitalsystem.model.specialization.Specialization;
import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.hospital.HospitalRepository;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Configuration
public class DatabaseInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        createHospital();
        createUser();
    }

    private void createHospital() {
        Optional<HospitalModel> hospitalModel = hospitalRepository.findById(1L);

        if (hospitalModel == null) {
            HospitalModel hospitalModel1 = new HospitalModel();
            hospitalModel1.setComercialName("Hospital Sede");
            hospitalModel1.setPhone("4766666666");
            hospitalModel1.setName("Hospital Sede");
            hospitalModel1.setZipCode("89258809");
            hospitalModel1.setId(1l);
            hospitalModel1.setIsActive(true);
            hospitalRepository.save(hospitalModel1);
        }
    }

    private void createUser() {
        UserModel userModel = userRepository.findByCrm("123546");

        if (userModel == null) {
            UserModel user = new UserModel();
            user.setUserName("mateus");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setName("Mateus");
            user.setEmail("mateus.walz@gmail.com");
            user.setSpecialization(Specialization.Surgeon);
            user.setRole(Role.Doctor);
            user.setHospitalId(1L);
            user.setIsActive(true);
            userRepository.save(user);
        }
    }

}
