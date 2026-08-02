package com.example.backend.dto.affiliation;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AffiliationSearchRequest {

    // Informations système

    private String sequenceWeb;

    private String statut;

    // Identification
    private String cnie;

    private String matricule;

    private String matriculeTgr;

    private String nom;

    private String prenom;

    // Date de saisie

    private LocalDate dateSaisieDebut;

    private LocalDate dateSaisieFin;
    // Date début affiliation

    private LocalDate dateDebutDebut;

    private LocalDate dateDebutFin;

    // Date du statut

    private LocalDate dateStatutDebut;

    private LocalDate dateStatutFin;

    // Date de réception

    private LocalDate dateReceptionDebut;

    private LocalDate dateReceptionFin;

}