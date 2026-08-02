package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "affiliation_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AffiliationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "affiliation_id", nullable = false)
    private Affiliation affiliation;

    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private ActionType action;

    @Enumerated(EnumType.STRING)
    @Column(name = "ancien_etat")
    private EtatAffiliation ancienEtat;

    @Enumerated(EnumType.STRING)
    @Column(name = "nouvel_etat")
    private EtatAffiliation nouvelEtat;

    @Column(name = "commentaire", length = 1000)
    private String commentaire;

    @Column(name = "username")
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "date_action", nullable = false)
    private LocalDateTime dateAction;

    @PrePersist
    public void prePersist() {
        this.dateAction = LocalDateTime.now();
    }
}