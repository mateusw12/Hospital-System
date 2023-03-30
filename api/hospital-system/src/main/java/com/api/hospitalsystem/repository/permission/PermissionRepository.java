package com.api.hospitalsystem.repository.permission;

import com.api.hospitalsystem.model.permission.PermissionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionModel, Long> {

   List<PermissionModel> findByUserName(String userName);

}
