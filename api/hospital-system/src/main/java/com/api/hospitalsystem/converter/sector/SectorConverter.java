package com.api.hospitalsystem.converter.sector;

import com.api.hospitalsystem.model.sector.Sector;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class SectorConverter implements AttributeConverter<Sector, String> {

    @Override
    public String convertToDatabaseColumn(Sector sector) {
        if(sector == null){
            return null;
        }
        return sector.getValue();
    }

    @Override
    public Sector convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(Sector.values())
                .filter(el -> el.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
