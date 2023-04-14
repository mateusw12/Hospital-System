package com.api.hospitalsystem.model.heathPlan;

public enum HeathPlan {

    Amil("Amil"),
    BradescoSaude("Bradesco Saúde"),
    Hapvida("Hapvida"),
    InterMedica("Intermédica"),
    NotredameIntermedica("NotreDame Intermédica"),
    SulAmerica("SulAmérica"),
    Unimed("Unimed"),
    GoldenCross("Golden Cross"),
    PortoSeguro("Porto Seguro"),
    SaoCristovao("São Cristóvão"),
    None("Nenhum");

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
