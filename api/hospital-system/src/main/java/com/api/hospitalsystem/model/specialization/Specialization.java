package com.api.hospitalsystem.model.specialization;

public enum Specialization {

    GeneralPratictitioner("Clinico Geral"),
    Ginecology("Ginecologista"),
    Cardiologist("Cardiologista"),
    Surgeon("Cirurgião"),
    Dermatologist("Dermatologista"),
    Endocrinologist("Endocrinologista"),
    Geriatric("Geriatra"),
    Pediatrician("Pediatra"),
    Othorpedist("Ortopedista");

    private final String description;

    Specialization(String description) {
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
