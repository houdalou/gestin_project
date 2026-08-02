package com.example.backend.service;

import com.example.backend.dto.affiliation.*;
import com.example.backend.entity.Affiliation;
import com.example.backend.entity.EtatAffiliation;
import com.example.backend.repository.AffiliationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AffiliationService {


    private final AffiliationRepository affiliationRepository;



    // =====================================================
    // CREATE AFFILIATION
    // =====================================================

    public AffiliationResponse createAffiliation(
            AffiliationRequest request
    ) {


        if (affiliationRepository.existsByCnie(request.getCnie())) {

            throw new RuntimeException(
                    "An affiliation with this CNIE already exists."
            );
        }


        Affiliation affiliation = Affiliation.builder()

                .sequenceWeb(generateSequenceWeb())

                .nom(request.getNom())
                .prenom(request.getPrenom())
                .cnie(request.getCnie())
                .matriculeTgr(request.getMatriculeTgr())
                .dateNaissance(request.getDateNaissance())
                .lieuNaissance(request.getLieuNaissance())
                .sexe(request.getSexe())
                .numeroSomCntDdp(request.getNumeroSomCntDdp())
                .situationFamiliale(request.getSituationFamiliale())
                .nationalite(request.getNationalite())

                .dateRecrutement(request.getDateRecrutement())
                .matriculeSalarie(request.getMatriculeSalarie())
                .regime(request.getRegime())
                .dateDebut(request.getDateDebut())

                .etat(EtatAffiliation.EN_COURS)

                .adresse(request.getAdresse())
                .quartier(request.getQuartier())
                .codePostal(request.getCodePostal())
                .ville(request.getVille())
                .pays(request.getPays())
                .province(request.getProvince())
                .region(request.getRegion())

                .telephoneDomicile(request.getTelephoneDomicile())
                .telephoneBureau(request.getTelephoneBureau())
                .telephoneGsm(request.getTelephoneGsm())

                .email(request.getEmail())

                .build();



        return mapToResponse(
                affiliationRepository.save(affiliation)
        );
    }







    // =====================================================
    // SEARCH
    // =====================================================

    public List<AffiliationResponse> search(
            AffiliationSearchRequest request
    ) {


        List<Affiliation> affiliations;


        if (request.getSequenceWeb() != null
                && !request.getSequenceWeb().isBlank()) {


            affiliations =
                    affiliationRepository
                            .findBySequenceWebContaining(
                                    request.getSequenceWeb()
                            );


        } else if (request.getCnie() != null
                && !request.getCnie().isBlank()) {


            affiliations =
                    affiliationRepository
                            .findByCnieContaining(
                                    request.getCnie()
                            );


        } else if (request.getMatriculeTgr() != null
                && !request.getMatriculeTgr().isBlank()) {


            affiliations =
                    affiliationRepository
                            .findByMatriculeTgrContaining(
                                    request.getMatriculeTgr()
                            );


        } else if (request.getNom() != null
                && !request.getNom().isBlank()) {


            affiliations =
                    affiliationRepository
                            .findByNomContainingIgnoreCase(
                                    request.getNom()
                            );


        } else if (request.getPrenom() != null
                && !request.getPrenom().isBlank()) {


            affiliations =
                    affiliationRepository
                            .findByPrenomContainingIgnoreCase(
                                    request.getPrenom()
                            );


        } else if (request.getStatut() != null
                && !request.getStatut().isBlank()) {


            affiliations =
                    affiliationRepository.findByEtat(
                            EtatAffiliation.valueOf(
                                    request.getStatut()
                            )
                    );


        } else {

            throw new RuntimeException(
                    "No search criteria provided"
            );
        }



        return affiliations.stream()
                .map(this::mapToResponse)
                .toList();
    }







    // =====================================================
    // GET BY ID
    // =====================================================

    public AffiliationResponse getById(Long id) {


        Affiliation affiliation =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );


        return mapToResponse(affiliation);
    }







    // =====================================================
    // UPDATE
    // =====================================================

    public AffiliationResponse update(
            Long id,
            AffiliationRequest request
    ) {


        Affiliation existing =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );



        if(existing.getEtat() != EtatAffiliation.EN_COURS) {

            throw new RuntimeException(
                    "Cannot modify processed affiliation"
            );
        }



        existing.setNom(request.getNom());
        existing.setPrenom(request.getPrenom());
        existing.setDateNaissance(request.getDateNaissance());
        existing.setLieuNaissance(request.getLieuNaissance());
        existing.setSexe(request.getSexe());
        existing.setNumeroSomCntDdp(request.getNumeroSomCntDdp());
        existing.setSituationFamiliale(request.getSituationFamiliale());
        existing.setNationalite(request.getNationalite());


        existing.setDateRecrutement(
                request.getDateRecrutement()
        );

        existing.setMatriculeSalarie(
                request.getMatriculeSalarie()
        );

        existing.setRegime(
                request.getRegime()
        );

        existing.setDateDebut(
                request.getDateDebut()
        );


        existing.setAdresse(request.getAdresse());
        existing.setQuartier(request.getQuartier());
        existing.setCodePostal(request.getCodePostal());
        existing.setVille(request.getVille());
        existing.setPays(request.getPays());
        existing.setProvince(request.getProvince());
        existing.setRegion(request.getRegion());


        existing.setTelephoneDomicile(
                request.getTelephoneDomicile()
        );

        existing.setTelephoneBureau(
                request.getTelephoneBureau()
        );

        existing.setTelephoneGsm(
                request.getTelephoneGsm()
        );


        existing.setEmail(
                request.getEmail()
        );


        return mapToResponse(
                affiliationRepository.save(existing)
        );
    }








    // =====================================================
    // CHANGE STATUS
    // =====================================================

    public AffiliationResponse changeStatus(
            Long id,
            ChangeStatusRequest request
    ) {


        Affiliation affiliation =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );


        affiliation.setEtat(
                request.getEtat()
        );


        return mapToResponse(
                affiliationRepository.save(affiliation)
        );
    }








    // =====================================================
    // REJECT
    // =====================================================

    public AffiliationResponse reject(
            Long id,
            RejectAffiliationRequest request
    ) {


        Affiliation affiliation =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );



        if(affiliation.getEtat()
                != EtatAffiliation.EN_COURS) {

            throw new RuntimeException(
                    "Affiliation already processed"
            );
        }



        affiliation.setEtat(
                EtatAffiliation.REJETEE
        );


        affiliation.setMotifRejet(
                request.getMotifRejet()
        );


        return mapToResponse(
                affiliationRepository.save(affiliation)
        );
    }








    // =====================================================
    // HISTORY
    // =====================================================

    public List<String> getHistory(Long id) {


        Affiliation affiliation =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );


        return List.of(

                "Created : "
                        + affiliation.getCreatedAt(),

                "Updated : "
                        + affiliation.getUpdatedAt(),

                "Status : "
                        + affiliation.getEtat()
        );
    }








    // =====================================================
    // MAPPER
    // =====================================================

    private AffiliationResponse mapToResponse(
            Affiliation affiliation
    ) {

        return AffiliationResponse.builder()

                .id(affiliation.getId())

                .sequenceWeb(
                        affiliation.getSequenceWeb()
                )

                .etat(
                        affiliation.getEtat()
                )

                .nom(
                        affiliation.getNom()
                )

                .prenom(
                        affiliation.getPrenom()
                )

                .cnie(
                        affiliation.getCnie()
                )

                .matriculeTgr(
                        affiliation.getMatriculeTgr()
                )

                .dateNaissance(
                        affiliation.getDateNaissance()
                )

                .lieuNaissance(
                        affiliation.getLieuNaissance()
                )

                .sexe(
                        affiliation.getSexe()
                )

                .numeroSomCntDdp(
                        affiliation.getNumeroSomCntDdp()
                )

                .situationFamiliale(
                        affiliation.getSituationFamiliale()
                )

                .nationalite(
                        affiliation.getNationalite()
                )

                .dateRecrutement(
                        affiliation.getDateRecrutement()
                )

                .matriculeSalarie(
                        affiliation.getMatriculeSalarie()
                )

                .regime(
                        affiliation.getRegime()
                )

                .dateDebut(
                        affiliation.getDateDebut()
                )

                .adresse(
                        affiliation.getAdresse()
                )

                .quartier(
                        affiliation.getQuartier()
                )

                .codePostal(
                        affiliation.getCodePostal()
                )

                .ville(
                        affiliation.getVille()
                )

                .pays(
                        affiliation.getPays()
                )

                .province(
                        affiliation.getProvince()
                )

                .region(
                        affiliation.getRegion()
                )

                .telephoneDomicile(
                        affiliation.getTelephoneDomicile()
                )

                .telephoneBureau(
                        affiliation.getTelephoneBureau()
                )

                .telephoneGsm(
                        affiliation.getTelephoneGsm()
                )

                .email(
                        affiliation.getEmail()
                )

                .createdAt(
                        affiliation.getCreatedAt()
                )

                .updatedAt(
                        affiliation.getUpdatedAt()
                )

                .build();
    }








    // =====================================================
    // GENERATE WEB NUMBER
    // =====================================================

    private String generateSequenceWeb() {


        long count =
                affiliationRepository.count() + 1;


        return String.format(
                "WEB-%06d",
                count
        );
    }

}