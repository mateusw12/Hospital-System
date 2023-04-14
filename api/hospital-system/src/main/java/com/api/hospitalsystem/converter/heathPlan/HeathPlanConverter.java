package com.api.hospitalsystem.converter.heathPlan;

import com.api.hospitalsystem.model.heathPlan.HeathPlan;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply=true)
public class  HeathPlanConverter implements AttributeConverter<HeathPlan, String> {

    @Override
    public String convertToDatabaseColumn(HeathPlan heathPlan) {
        if(heathPlan == null){
            return HeathPlan.None.getValue();
        }
        return heathPlan.getValue();
    }

    @Override
    public HeathPlan convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(HeathPlan.values())
                .filter(el -> el.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
