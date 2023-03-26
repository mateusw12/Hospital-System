package com.api.hospitalsystem.converter.specialization;

import com.api.hospitalsystem.model.specialization.Specialization;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class SpecializationConverter implements AttributeConverter<Specialization, String> {

    @Override
    public String convertToDatabaseColumn(Specialization specialization) {
        if(specialization == null){
            return null;
        }
        return specialization.getValue();
    }

    @Override
    public Specialization convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(Specialization.values())
                .filter(el -> el.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
