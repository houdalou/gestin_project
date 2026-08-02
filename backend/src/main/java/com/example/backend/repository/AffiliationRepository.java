package com.example.backend.repository;

import com.example.backend.entity.Affiliation;
import com.example.backend.entity.EtatAffiliation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface AffiliationRepository
        extends JpaRepository<Affiliation, Long>,
        JpaSpecificationExecutor<Affiliation> {


    // =========================
    // EXISTING CHECKS
    // =========================

    boolean existsByCnie(String cnie);



    // =========================
    // UNIQUE SEARCH
    // =========================

    Optional<Affiliation> findByCnie(String cnie);

    Optional<Affiliation> findBySequenceWeb(String sequenceWeb);

    Optional<Affiliation> findByMatriculeTgr(String matriculeTgr);



    // =========================
    // ADVANCED SEARCH
    // =========================

    List<Affiliation> findBySequenceWebContaining(
            String sequenceWeb
    );


    List<Affiliation> findByCnieContaining(
            String cnie
    );


    List<Affiliation> findByMatriculeTgrContaining(
            String matriculeTgr
    );


    List<Affiliation> findByNomContainingIgnoreCase(
            String nom
    );


    List<Affiliation> findByPrenomContainingIgnoreCase(
            String prenom
    );


    List<Affiliation> findByEtat(
            EtatAffiliation etat
    );

}