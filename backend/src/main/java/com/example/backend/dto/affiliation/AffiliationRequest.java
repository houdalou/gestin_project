package com.example.backend.dto.affiliation;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AffiliationRequest {

    // ==========================
    // Identification de l'affilié
    // ==========================

    private String nom;

    private String prenom;

    private String cnie;

    private String matriculeTgr;

    private LocalDate dateNaissance;

    private String lieuNaissance;

    private String sexe;

    private String numeroSomCntDdp;

    private String situationFamiliale;

    private String nationalite;

    // ==========================
    // Situation professionnelle
    // ==========================

    private LocalDate dateRecrutement;

    private String matriculeSalarie;

    private String regime;

    /**
     * Date début affiliation
     */
    private LocalDate dateDebut;

    // ==========================
    // Adresse
    // ==========================

    private String adresse;

    private String quartier;

    private String codePostal;

    private String ville;

    private String pays;

    private String province;

    private String region;

    private String telephoneDomicile;

    private String telephoneBureau;

    private String telephoneGsm;

    private String motifRejet;

    private String email;
}