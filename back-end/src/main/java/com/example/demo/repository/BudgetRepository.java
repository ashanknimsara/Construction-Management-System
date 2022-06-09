package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Budget;

@Repository

public interface BudgetRepository extends JpaRepository<Budget, Long> {

}
