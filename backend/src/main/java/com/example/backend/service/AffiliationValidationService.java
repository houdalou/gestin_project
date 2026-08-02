package com.example.backend.service;

import com.example.backend.dto.affiliation.AffiliationResponse;
import com.example.backend.dto.affiliation.ChangeStatusRequest;
import com.example.backend.dto.affiliation.RejectAffiliationRequest;
import com.example.backend.entity.Affiliation;
import com.example.backend.entity.EtatAffiliation;
import com.example.backend.mapper.AffiliationMapper;
import com.example.backend.repository.AffiliationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AffiliationValidationService {


    private final AffiliationRepository affiliationRepository;
    private final AffiliationMapper affiliationMapper;
    private final AffiliationHistoryService historyService;



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


        EtatAffiliation oldStatus =
                affiliation.getEtat();



        affiliation.setEtat(
                request.getEtat()
        );


        if(request.getEtat()
                == EtatAffiliation.ACCEPTEE){

            affiliation.setDateValidation(
                    LocalDateTime.now()
            );

        }


        affiliationRepository.save(affiliation);



        historyService.saveHistory(
                affiliation,
                null,
                oldStatus,
                request.getEtat(),
                "Status changed",
                "admin",
                null
        );



        return affiliationMapper.toResponse(
                affiliation
        );
    }





    public AffiliationResponse reject(
            Long id,
            RejectAffiliationRequest request
    ){

        Affiliation affiliation =
                affiliationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Affiliation not found"
                                )
                        );


        EtatAffiliation oldStatus =
                affiliation.getEtat();



        affiliation.setEtat(
                EtatAffiliation.REJETEE
        );


        affiliation.setMotifRejet(
                request.getMotifRejet()
        );


        affiliation.setDateRejet(
                LocalDateTime.now()
        );


        affiliationRepository.save(
                affiliation
        );



        historyService.saveHistory(
                affiliation,
                null,
                oldStatus,
                EtatAffiliation.REJETEE,
                request.getMotifRejet(),
                "admin",
                null
        );



        return affiliationMapper.toResponse(
                affiliation
        );
    }

}