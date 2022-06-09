package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Expenses;

public interface ExpensesRepository extends JpaRepository<Expenses, Long>{

	//Optional<Expenses> findByIdAndBudgetId(Long eid, Long pid);

	//Optional<Expenses> findByIdAndBudgetId(Long eid, Long pid);

	//Optional<Expenses> findByBudgetId( Long PID);
    //Optional<Expenses> findByIdAndBudgetId(Long id, Long pid);

	
	

}
