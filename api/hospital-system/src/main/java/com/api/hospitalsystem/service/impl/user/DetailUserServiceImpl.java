package com.api.hospitalsystem.service.impl.user;

import com.api.hospitalsystem.model.login.DetailUserLogin;
import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DetailUserServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> userModel = Optional.ofNullable(userRepository.findByUserName(username));
        if (userModel.isEmpty()) {
            throw new UsernameNotFoundException("User [" + username + "] not found!");
        }
        return new DetailUserLogin(userModel);
    }


}
