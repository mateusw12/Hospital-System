package com.api.hospitalsystem.repository.user;

import com.api.hospitalsystem.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    UserModel findByCrm(String crm);

    UserModel findByUserName(String userName);

}
