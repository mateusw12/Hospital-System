package com.api.hospitalsystem.mapper.permission;

import com.api.hospitalsystem.dto.permission.PermissionDTO;
import com.api.hospitalsystem.model.permission.PermissionModel;
import org.springframework.stereotype.Component;

@Component
public class PermissionMapper {

    public PermissionDTO toDTO(PermissionModel permissionModel) {
        if (permissionModel == null) {
            return null;
        }
        return new PermissionDTO(
                permissionModel.getId(),
                permissionModel.getUserName(),
                permissionModel.getItemId()
        );
    }

    public PermissionModel toEntity(PermissionDTO permissionDTO) {

        if (permissionDTO == null) {
            return null;
        }

        PermissionModel permissionModel = new PermissionModel();
        if (permissionDTO.id() != null) {
            permissionModel.setId(permissionDTO.id());
        }
        permissionModel.setItemId(permissionDTO.itemId());
        permissionModel.setUserName(permissionDTO.userName());
        return permissionModel;
    }

}
