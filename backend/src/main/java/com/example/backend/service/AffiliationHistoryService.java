package com.example.backend.service;

import com.example.backend.dto.affiliation.AffiliationHistoryResponse;
import com.example.backend.entity.*;
import com.example.backend.repository.AffiliationHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AffiliationHistoryService {

    private final AffiliationHistoryRepository repository;

    public void saveHistory(
            Affiliation affiliation,
            ActionType action,
            EtatAffiliation ancienEtat,
            EtatAffiliation nouvelEtat,
            String commentaire,
            String username,
            Role role
    ) {

        AffiliationHistory history = AffiliationHistory.builder()
                .affiliation(affiliation)
                .action(action)
                .ancienEtat(ancienEtat)
                .nouvelEtat(nouvelEtat)
                .commentaire(commentaire)
                .username(username)
                .role(role)
                .build();

        repository.save(history);
    }

    public List<AffiliationHistoryResponse> getHistory(Long affiliationId) {

        return repository
                .findByAffiliationIdOrderByDateActionDesc(affiliationId)
                .stream()
                .map(history ->
                        AffiliationHistoryResponse.builder()
                                .id(history.getId())
                                .action(history.getAction())
                                .ancienEtat(history.getAncienEtat())
                                .nouvelEtat(history.getNouvelEtat())
                                .commentaire(history.getCommentaire())
                                .dateAction(history.getDateAction())
                                .build()
                )
                .toList();
    }

}