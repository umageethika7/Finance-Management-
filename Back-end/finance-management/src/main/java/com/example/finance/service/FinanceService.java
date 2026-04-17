package com.example.finance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.finance.entity.FinanceRecord;
import com.example.finance.repository.FinanceRepository;

@Service
public class FinanceService {

    @Autowired
    private FinanceRepository repo;

    // CREATE
    public FinanceRecord save(FinanceRecord record) {
        return repo.save(record);
    }

    // GET ALL (SORTING)
    public List<FinanceRecord> getAll(String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return repo.findAll(sort);
    }

    // GET BY ID
    public FinanceRecord getById(Long id) {
        return repo.findById(id).orElse(null);
   }

    // UPDATE
    public FinanceRecord update(Long id, FinanceRecord record) {
        record.setId(id);
        return repo.save(record);
    }

    // DELETE
    public void delete(Long id) {
        repo.deleteById(id);
    }
}