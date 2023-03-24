package com.api.hospitalsystem.mapper.disiase;

import com.api.hospitalsystem.dto.disiase.DisiaseDTO;
import com.api.hospitalsystem.model.disiase.DisiaseModel;
import org.springframework.stereotype.Component;

@Component
public class DisiaseMapper {

    public DisiaseDTO toDTO(DisiaseModel disiaseModel) {
        if (disiaseModel == null) {
            return null;
        }
        return new DisiaseDTO(
                disiaseModel.getId(),
                disiaseModel.getName(),
                disiaseModel.getCid()
        );
    }

    public DisiaseModel toEntity(DisiaseDTO disiaseDTO) {

        if (disiaseDTO == null) {
            return null;
        }

        DisiaseModel disiaseModel = new DisiaseModel();
        if (disiaseDTO.id() != null) {
            disiaseModel.setId(disiaseDTO.id());
        }
        disiaseModel.setName(disiaseDTO.name());
        disiaseModel.setCid(disiaseDTO.cid());
        return disiaseModel;
    }

}
