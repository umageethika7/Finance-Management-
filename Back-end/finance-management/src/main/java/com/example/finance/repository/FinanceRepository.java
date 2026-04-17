package com.example.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.finance.entity.FinanceRecord;

public interface FinanceRepository extends JpaRepository<FinanceRecord, Long> {
}