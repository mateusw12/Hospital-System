package com.api.hospitalsystem.converter.role;

import com.api.hospitalsystem.model.role.Role;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class RoleConverter implements AttributeConverter<Role, String> {

    @Override
    public String convertToDatabaseColumn(Role role) {
        if(role == null){
            return null;
        }
        return role.getValue();
    }

    @Override
    public Role convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
       return Stream.of(Role.values())
               .filter(el -> el.getValue().equals(value))
               .findFirst()
               .orElseThrow(IllegalArgumentException::new);
    }

}
