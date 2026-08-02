package com.example.backend.dto.affiliation;

import com.example.backend.entity.EtatAffiliation;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class AffiliationResponse {

    private Long id;

    private String sequenceWeb;

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

    private LocalDate dateRecrutement;

    private String matriculeSalarie;

    private String regime;

    private LocalDate dateDebut;

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

    private String email;

    private EtatAffiliation etat;

    private String motifRejet;

    private LocalDateTime dateValidation;

    private LocalDateTime dateRejet;

    private LocalDateTime dateDerniereModification;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}