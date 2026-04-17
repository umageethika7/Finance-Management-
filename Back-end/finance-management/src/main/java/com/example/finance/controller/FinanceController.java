package com.example.finance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.finance.entity.FinanceRecord;
import com.example.finance.service.FinanceService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/finance")
public class FinanceController {

    @Autowired
    private FinanceService service;

    // CREATE
    @PostMapping
    public FinanceRecord create(@RequestBody FinanceRecord record) {
        return service.save(record);
    }

    // GET ALL + SORT
    @GetMapping
    public List<FinanceRecord> getAll(
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "asc") String direction) {

        return service.getAll(sort, direction);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public FinanceRecord getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public FinanceRecord update(@PathVariable Long id, @RequestBody FinanceRecord record) {
        return service.update(id, record);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}