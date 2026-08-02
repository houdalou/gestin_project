package com.example.backend.service;

import com.example.backend.dto.affiliation.AffiliationResponse;
import com.example.backend.dto.affiliation.AffiliationSearchRequest;
import com.example.backend.entity.Affiliation;
import com.example.backend.mapper.AffiliationMapper;
import com.example.backend.repository.AffiliationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AffiliationSearchService {

    private final AffiliationRepository affiliationRepository;
    private final AffiliationMapper affiliationMapper;


    public List<AffiliationResponse> search(AffiliationSearchRequest request) {

        List<Affiliation> affiliations =
                affiliationRepository.findAll();


        return affiliations.stream()

                .filter(a ->
                        request.getSequenceWeb() == null ||
                                request.getSequenceWeb().isEmpty() ||
                                a.getSequenceWeb()
                                        .equalsIgnoreCase(request.getSequenceWeb())
                )

                .filter(a ->
                        request.getCnie() == null ||
                                request.getCnie().isEmpty() ||
                                a.getCnie()
                                        .equalsIgnoreCase(request.getCnie())
                )

                .filter(a ->
                        request.getMatriculeTgr() == null ||
                                request.getMatriculeTgr().isEmpty() ||
                                a.getMatriculeTgr()
                                        .equalsIgnoreCase(request.getMatriculeTgr())
                )

                .filter(a ->
                        request.getNom() == null ||
                                request.getNom().isEmpty() ||
                                a.getNom()
                                        .toLowerCase()
                                        .contains(request.getNom().toLowerCase())
                )

                .filter(a ->
                        request.getPrenom() == null ||
                                request.getPrenom().isEmpty() ||
                                a.getPrenom()
                                        .toLowerCase()
                                        .contains(request.getPrenom().toLowerCase())
                )

                .filter(a ->
                        request.getStatut() == null ||
                                request.getStatut().isEmpty() ||
                                a.getEtat()
                                        .name()
                                        .equalsIgnoreCase(request.getStatut())
                )

                .map(affiliationMapper::toResponse)

                .toList();
    }
}