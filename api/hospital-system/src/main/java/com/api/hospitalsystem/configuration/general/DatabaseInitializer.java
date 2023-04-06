package com.api.hospitalsystem.configuration.general;

import com.api.hospitalsystem.model.hospital.HospitalModel;
import com.api.hospitalsystem.model.item.ItemModel;
import com.api.hospitalsystem.model.permission.PermissionModel;
import com.api.hospitalsystem.model.role.Role;
import com.api.hospitalsystem.model.specialization.Specialization;
import com.api.hospitalsystem.model.user.UserModel;
import com.api.hospitalsystem.repository.hospital.HospitalRepository;
import com.api.hospitalsystem.repository.item.ItemRepository;
import com.api.hospitalsystem.repository.permission.PermissionRepository;
import com.api.hospitalsystem.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Configuration
public class DatabaseInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        createHospital();
        createUser();
        createItem();
        createPermission();
    }

    private void createHospital() {
        Optional<HospitalModel> hospitalModel = hospitalRepository.findById(1L);

        if (!hospitalModel.isPresent()) {
            HospitalModel hospitalModel1 = new HospitalModel();
            hospitalModel1.setComercialName("Hospital Sede");
            hospitalModel1.setPhone("4766666666");
            hospitalModel1.setName("Hospital Sede");
            hospitalModel1.setZipCode("89258809");
            hospitalModel1.setIsActive(true);
            hospitalRepository.save(hospitalModel1);
        }
    }

    private void createUser() {
        UserModel userModel = userRepository.findByUserName("mateus");

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

    private void createItem() {
        ItemModel userItem = itemRepository.findByOnlyPath("usuario");
        ItemModel permissionItem = itemRepository.findByOnlyPath("permissao");
        ItemModel companyItem = itemRepository.findByOnlyPath("empresa");
        ItemModel itemModel = itemRepository.findByOnlyPath("item");

        if (userItem == null) {
            ItemModel item = new ItemModel();
            item.setDescription("Cadastro Usuário");
            item.setDescriptionFather("Administração");
            item.setItemFather("Administração");
            item.setOnlyPath("usuario");
            item.setPath("menu/administracao/usuario");
            item.setVisible(true);
            itemRepository.save(item);
        }

        if (permissionItem == null) {
            ItemModel item = new ItemModel();
            item.setDescription("Permissão");
            item.setDescriptionFather("Administração");
            item.setItemFather("Administração");
            item.setOnlyPath("permissao");
            item.setPath("menu/administracao/permissao");
            item.setVisible(true);
            itemRepository.save(item);
        }

        if (companyItem == null) {
            ItemModel item = new ItemModel();
            item.setDescription("Cadastro Empresa");
            item.setDescriptionFather("Administração");
            item.setItemFather("Administração");
            item.setOnlyPath("empresa");
            item.setPath("menu/administracao/empresa");
            item.setVisible(true);
            itemRepository.save(item);
        }

        if (itemModel == null) {
            ItemModel item = new ItemModel();
            item.setDescription("Cadastro Item");
            item.setDescriptionFather("Administração");
            item.setItemFather("Administração");
            item.setOnlyPath("item");
            item.setPath("menu/administracao/item");
            item.setVisible(true);
            itemRepository.save(item);
        }
    }

    private void createPermission(){
        List<PermissionModel> permissionModels = permissionRepository.findByUserName("mateus");
        String userName = "mateus";
        if(permissionModels.size() == 0 || permissionModels.isEmpty()){
            PermissionModel userPermission = new PermissionModel();
            userPermission.setItemId(2L);
            userPermission.setUserName(userName);
            permissionRepository.save(userPermission);

            PermissionModel permission = new PermissionModel();
            permission.setItemId(3L);
            permission.setUserName(userName);
            permissionRepository.save(permission);

            PermissionModel companyPermission = new PermissionModel();
            companyPermission.setItemId(4L);
            companyPermission.setUserName(userName);
            permissionRepository.save(companyPermission);

            PermissionModel itemPermission = new PermissionModel();
            itemPermission.setItemId(5L);
            itemPermission.setUserName(userName);
            permissionRepository.save(itemPermission);

        }

    }

}
