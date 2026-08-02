package com.example.backend.dto.affiliation;

import com.example.backend.entity.EtatAffiliation;
import lombok.Data;

@Data
public class ChangeStatusRequest {

    private EtatAffiliation etat;

}