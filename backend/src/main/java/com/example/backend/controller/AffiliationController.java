package com.example.backend.controller;

import com.example.backend.dto.affiliation.*;
import com.example.backend.service.AffiliationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affiliations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AffiliationController {


    private final AffiliationService affiliationService;


    /*
     * Création d'une nouvelle affiliation
     * Etat initial = EN_COURS
     */
    @PostMapping
    public ResponseEntity<AffiliationResponse> createAffiliation(
            @RequestBody AffiliationRequest request
    ) {

        AffiliationResponse response =
                affiliationService.createAffiliation(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }



    /*
     * Recherche pour:
     * - Numéro Web
     * - CNIE
     * - Matricule TGR
     *
     * Utilisé dans:
     * Suivi et Modification
     * Consultation
     */
    @PostMapping("/search")
    public ResponseEntity<List<AffiliationResponse>> search(
            @RequestBody AffiliationSearchRequest request
    ) {

        return ResponseEntity.ok(
                affiliationService.search(request)
        );
    }



    /*
     * Consultation d'une affiliation
     */
    @GetMapping("/{id}")
    public ResponseEntity<AffiliationResponse> getById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                affiliationService.getById(id)
        );
    }



    /*
     * Modification d'une affiliation
     *
     * Autorisée seulement si:
     * etat = EN_COURS
     */
    @PutMapping("/{id}")
    public ResponseEntity<AffiliationResponse> update(
            @PathVariable Long id,
            @RequestBody AffiliationRequest request
    ) {

        return ResponseEntity.ok(
                affiliationService.update(id, request)
        );
    }



    /*
     * Changement d'état:
     *
     * EN_COURS -> ACCEPTEE
     * EN_COURS -> REJETEE
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<AffiliationResponse> changeStatus(
            @PathVariable Long id,
            @RequestBody ChangeStatusRequest request
    ) {

        return ResponseEntity.ok(
                affiliationService.changeStatus(id, request)
        );
    }



    /*
     * Rejet avec motif obligatoire
     */
    @PutMapping("/{id}/reject")
    public ResponseEntity<AffiliationResponse> reject(
            @PathVariable Long id,
            @RequestBody RejectAffiliationRequest request
    ) {

        return ResponseEntity.ok(
                affiliationService.reject(id, request)
        );
    }



    /*
     * Historique des modifications/statuts
     */
    @GetMapping("/{id}/history")
    public ResponseEntity<List<?>> history(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                affiliationService.getHistory(id)
        );
    }

}