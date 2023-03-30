package com.api.hospitalsystem.service.permission;

import com.api.hospitalsystem.dto.permission.PermissionDTO;
import com.api.hospitalsystem.mapper.permission.PermissionMapper;
import com.api.hospitalsystem.repository.permission.PermissionRepository;
import com.api.hospitalsystem.repository.user.UserRepository;
import com.api.hospitalsystem.validator.user.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionMapper permissionMapper;

    @Autowired
    private UserValidator userValidator;

    @Transactional
    public List<PermissionDTO> findAll() {
        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PermissionDTO findById(Long id) {
        return permissionRepository.findById(id).map(permissionMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found" + id));
    }

    @Transactional
    public List<PermissionDTO> findByUserName(String userName) throws IllegalArgumentException {
        userValidator.validateUserName(userName);
        return permissionRepository.findByUserName(userName)
                .stream()
                .map(permissionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PermissionDTO create(PermissionDTO permissionDTO) {
        userValidator.validateUserName(permissionDTO.userName());
        return permissionMapper.toDTO(permissionRepository.save(permissionMapper.toEntity(permissionDTO)));
    }

    @Transactional
    public PermissionDTO update(Long id, PermissionDTO permissionDTO) {
        userValidator.validateUserName(permissionDTO.userName());
        return permissionRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setUserName(permissionDTO.userName());
                    recordFound.setItemId(permissionDTO.itemId());
                    return permissionMapper.toDTO(permissionRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Permission not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        permissionRepository.delete(permissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found" + id)));
    }

}
