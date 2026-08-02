package com.example.backend.dto.affiliation;

import com.example.backend.entity.ActionType;
import com.example.backend.entity.EtatAffiliation;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AffiliationHistoryResponse {

    private Long id;

    private ActionType action;

    private EtatAffiliation ancienEtat;

    private EtatAffiliation nouvelEtat;

    private String commentaire;

    private LocalDateTime dateAction;

}