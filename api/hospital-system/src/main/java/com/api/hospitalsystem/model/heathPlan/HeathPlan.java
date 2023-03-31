package com.api.hospitalsystem.model.heathPlan;

public enum HeathPlan {

    AMIL("Amil"),
    BRADESCO_SAUDE("Bradesco Saúde"),
    HAPVIDA("Hapvida"),
    INTERMEDICA("Intermédica"),
    NOTREDAME_INTERMEDICA("NotreDame Intermédica"),
    SULAMERICA("SulAmérica"),
    UNIMED("Unimed"),
    GOLDEN_CROSS("Golden Cross"),
    PORTO_SEGURO("Porto Seguro"),
    SAO_CRISTOVAO("São Cristóvão");

    private final String description;

    HeathPlan(String description) {
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
