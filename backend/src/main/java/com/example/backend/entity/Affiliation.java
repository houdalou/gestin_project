package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "affiliations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Affiliation {

    @Id
    @SequenceGenerator(
            name = "affiliation_seq",
            sequenceName = "affiliation_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "affiliation_seq"
    )
    private Long id;

    @Column(name = "sequence_web", nullable = false, unique = true)
    private String sequenceWeb;

    @NotBlank(message = "Nom is required")
    @Column(nullable = false)
    private String nom;

    @NotBlank(message = "Prénom is required")
    @Column(nullable = false)
    private String prenom;

    @NotBlank(message = "CNIE is required")
    @Column(nullable = false, unique = true)
    private String cnie;

    @Column(name = "matricule_tgr")
    private String matriculeTgr;

    private LocalDate dateNaissance;

    private String lieuNaissance;

    private String sexe;

    @Column(name = "numero_som_cnt_ddp")
    private String numeroSomCntDdp;

    private String situationFamiliale;

    private String nationalite;

    private LocalDate dateRecrutement;

    @Column(name = "matricule_salarie")
    private String matriculeSalarie;

    private String regime;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EtatAffiliation etat;

    @Column(length = 500)
    private String adresse;

    private String quartier;

    private String codePostal;

    private String ville;

    private String pays;

    private String province;

    private String region;

    @Column(name = "tel_domicile")
    private String telephoneDomicile;

    @Column(name = "tel_bureau")
    private String telephoneBureau;

    @Column(name = "tel_gsm")
    private String telephoneGsm;

    @Email(message = "Invalid email address")
    private String email;

    @Column(name = "motif_rejet", length = 1000)
    private String motifRejet;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    @Column(name = "date_rejet")
    private LocalDateTime dateRejet;

    @Column(name = "date_derniere_modification")
    private LocalDateTime dateDerniereModification;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        this.createdAt = now;
        this.updatedAt = now;
        this.dateDerniereModification = now;
    }

    @PreUpdate
    public void preUpdate() {
        LocalDateTime now = LocalDateTime.now();

        this.updatedAt = now;
        this.dateDerniereModification = now;
    }
}