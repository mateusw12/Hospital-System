package com.api.hospitalsystem.model.maritalStatus;

public enum MaritalStatus {

    Married("Casado"),
    StableUnion("União Estável"),
    Widower("Viúvo"),
    Single("Solteiro");

    private final String description;

    MaritalStatus(String description) {
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
