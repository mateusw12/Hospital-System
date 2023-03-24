package com.api.hospitalsystem.dto.disiase;

import lombok.NonNull;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

public record DisiaseDTO(
        @Id Long id,
        @NonNull @NotBlank @Length(max = 300) String name,
        @NonNull @NotBlank @Length(max = 100) String cid
) {
}
