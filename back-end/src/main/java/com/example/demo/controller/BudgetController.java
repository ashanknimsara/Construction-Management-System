package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Budget;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.ExpensesRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class BudgetController {
	
	@Autowired
	private BudgetRepository budgetRepository;
	

	// get all budget details
	@GetMapping("/Budget")
	public List<Budget> getAllBudget() {
		return budgetRepository.findAll();
	}
	
	//create budget rest api
	@PostMapping("/Budget")
	public Budget createBudget(@RequestBody Budget budget) {
		return budgetRepository.save(budget);
	}
	
	//get budget by id rest api
	@GetMapping("/Budget/{id}")
	public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
		
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Project not existing with id :" + id));
		return ResponseEntity.ok(budget); 
	}
	
	//update Budget rest api
	@PutMapping("/Budget/{id}")
	public ResponseEntity<Budget> updateBudget(@PathVariable Long id,@RequestBody Budget budgetDetails){
		
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Project not existing with id :" + id));
		
		budget.setPname(budgetDetails.getPname());
		budget.setBudget(budgetDetails.getBudget());
		budget.setStatus(budgetDetails.getStatus());
		
		Budget updateBudget = budgetRepository.save(budget);
		
		return ResponseEntity.ok(updateBudget);
	}
	
	//delete budget rest api
	@DeleteMapping("/Budget/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBudget(@PathVariable Long id){
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project not existing with id :" + id));
		
		budgetRepository.delete(budget);
		Map<String, Boolean>response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
