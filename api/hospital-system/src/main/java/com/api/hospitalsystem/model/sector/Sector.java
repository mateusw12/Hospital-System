package com.api.hospitalsystem.model.sector;

public enum Sector {

    Room("Quarto"),
    Infirmary("Enfermaria"),
    BirthRoom("Sala de parto"),
    Nursery("Berçário"),
    ApartmentPostpartum("Apartamento para o pós-parto"),
    Emergency("Pronto-socorro"),
    Icu("UTI"),
    Surgey("Cirurgia"),
    Adm("Administração");

    private final String description;

    Sector(String description) {
        this.description = description;
    }

    public String getValue() {
        return description;
    }

    @Override
    public String toString() {
        return description;
    }

}
