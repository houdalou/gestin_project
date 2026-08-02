package com.example.backend.mapper;

import com.example.backend.dto.affiliation.AffiliationResponse;
import com.example.backend.entity.Affiliation;
import org.springframework.stereotype.Component;

@Component
public class AffiliationMapper {

    public AffiliationResponse toResponse(Affiliation affiliation) {

        return AffiliationResponse.builder()
                .id(affiliation.getId())
                .sequenceWeb(affiliation.getSequenceWeb())

                .nom(affiliation.getNom())
                .prenom(affiliation.getPrenom())
                .cnie(affiliation.getCnie())
                .matriculeTgr(affiliation.getMatriculeTgr())
                .dateNaissance(affiliation.getDateNaissance())
                .lieuNaissance(affiliation.getLieuNaissance())
                .sexe(affiliation.getSexe())
                .numeroSomCntDdp(affiliation.getNumeroSomCntDdp())
                .situationFamiliale(affiliation.getSituationFamiliale())
                .nationalite(affiliation.getNationalite())

                .dateRecrutement(affiliation.getDateRecrutement())
                .matriculeSalarie(affiliation.getMatriculeSalarie())
                .regime(affiliation.getRegime())
                .dateDebut(affiliation.getDateDebut())

                .adresse(affiliation.getAdresse())
                .quartier(affiliation.getQuartier())
                .codePostal(affiliation.getCodePostal())
                .ville(affiliation.getVille())
                .pays(affiliation.getPays())
                .province(affiliation.getProvince())
                .region(affiliation.getRegion())

                .telephoneDomicile(affiliation.getTelephoneDomicile())
                .telephoneBureau(affiliation.getTelephoneBureau())
                .telephoneGsm(affiliation.getTelephoneGsm())

                .email(affiliation.getEmail())

                .etat(affiliation.getEtat())
                .motifRejet(affiliation.getMotifRejet())
                .dateValidation(affiliation.getDateValidation())
                .dateRejet(affiliation.getDateRejet())
                .dateDerniereModification(affiliation.getDateDerniereModification())

                .createdAt(affiliation.getCreatedAt())
                .updatedAt(affiliation.getUpdatedAt())

                .build();
    }
}