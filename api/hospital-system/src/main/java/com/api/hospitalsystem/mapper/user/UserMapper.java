package com.api.hospitalsystem.mapper.user;

import com.api.hospitalsystem.dto.user.UserDTO;
import com.api.hospitalsystem.model.user.UserModel;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        return new UserDTO(
                userModel.getId(),
                userModel.getName(),
                userModel.getUserName(),
                userModel.getCrm(),
                userModel.getPassword(),
                userModel.getIsActive(),
                userModel.getRole(),
                userModel.getEmail()
        );
    }

    public UserModel toEntity(UserDTO userDTO) {

        if (userDTO == null) {
            return null;
        }

        UserModel userModel = new UserModel();
        if (userDTO.id() != null) {
            userModel.setId(userDTO.id());
        }
        userModel.setName(userDTO.name());
        userModel.setCrm(userDTO.crm());
        userModel.setEmail(userDTO.email());
        userModel.setPassword(userDTO.password());
        userModel.setIsActive(userDTO.isActive());
        userModel.setUserName(userDTO.userName());
        userModel.setRole(userDTO.role());
        return userModel;
    }

}
