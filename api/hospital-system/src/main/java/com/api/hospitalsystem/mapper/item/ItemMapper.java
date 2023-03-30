package com.api.hospitalsystem.mapper.item;

import com.api.hospitalsystem.dto.item.ItemDTO;
import com.api.hospitalsystem.model.item.ItemModel;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {

    public ItemDTO toDTO(ItemModel itemModel) {
        if (itemModel == null) {
            return null;
        }
        return new ItemDTO(
                itemModel.getId(),
                itemModel.getDescription(),
                itemModel.getDescriptionFather(),
                itemModel.getOnlyPath(),
                itemModel.getPath(),
                itemModel.getItemFather(),
                itemModel.getVisible()
        );
    }

    public ItemModel toEntity(ItemDTO patientDTO) {

        if (patientDTO == null) {
            return null;
        }

        ItemModel itemModel = new ItemModel();
        if (patientDTO.id() != null) {
            itemModel.setId(patientDTO.id());
        }
        itemModel.setItemFather(patientDTO.itemFather());
        itemModel.setDescription(patientDTO.description());
        itemModel.setDescriptionFather(patientDTO.descriptionFather());
        itemModel.setOnlyPath(patientDTO.onlyPath());
        itemModel.setPath(patientDTO.path());
        itemModel.setVisible(patientDTO.visible());
        return itemModel;
    }

}
