package com.example.backend.repository;

import com.example.backend.entity.AffiliationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AffiliationHistoryRepository
        extends JpaRepository<AffiliationHistory, Long> {

    List<AffiliationHistory> findByAffiliationIdOrderByDateActionDesc(Long affiliationId);

}