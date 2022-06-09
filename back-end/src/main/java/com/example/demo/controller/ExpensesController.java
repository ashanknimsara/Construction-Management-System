package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.example.demo.model.Expenses;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.ExpensesRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class ExpensesController {
	
	@Autowired
	private ExpensesRepository expensesRepository;
	
	@Autowired
	private BudgetRepository budgetRepository;
	
	//Budget budget;
	
	// get all expenses details according to the budget
	@GetMapping("/Expenses")
	public List<Expenses> getAllExpenses() {
		return expensesRepository.findAll();
	}
	
	//create expenses rest api
	@PostMapping("/Expenses")
	public Expenses createExpenses(@RequestBody Expenses expenses) {
		return expensesRepository.save(expenses);
	}
	
	//get budget by id rest api
	@GetMapping("/Expenses/{id}")
	public ResponseEntity<Expenses> getExpensesById(@PathVariable Long id) {
			
		Expenses expenses = expensesRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Expenses not existing with id :" + id));
		return ResponseEntity.ok(expenses); 
	}
	
	//update expenses rest api
	@PutMapping("/Expenses/{id}")
	public ResponseEntity<Expenses> updateExpenses(@PathVariable Long id,@RequestBody Expenses expensesDetails){
			
		Expenses expenses = expensesRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Project not existing with id :" + id));
			
		expenses.setExpenseName(expensesDetails.getExpenseName());
		expenses.setExpensePrice(expensesDetails.getExpensePrice());
		expenses.setExpenseDate(expensesDetails.getExpenseDate());
		//expenses.setBudget(expensesDetails.getBudget());
		
			
		Expenses updateExpenses = expensesRepository.save(expenses);
			
		return ResponseEntity.ok(updateExpenses);
	}
	
	//delete expense rest api
	@DeleteMapping("/Expenses/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteExpenses(@PathVariable Long id){
		Expenses expenses = expensesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Expense not existing with id :" + id));
			
		expensesRepository.delete(expenses);
		Map<String, Boolean>response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
/*	//create expenses rest api according to the budget
	@PostMapping("/Budget/{pid}/Expenses")
	public Expenses createExpenses(@PathVariable (value = "pid") Long pid,
            @Validated @RequestBody Expenses expenses) {
		return budgetRepository.findById(pid).map(budget -> {
			expenses.setBudget(budget);
			return expensesRepository.save(expenses);
		}).orElseThrow(() -> new ResourceNotFoundException("pid " + pid + " not found"));
	}*/
	
/*	//get expenses by id rest api
	@GetMapping("/Expenses/{id}")
	public ResponseEntity<Expenses> getExpensesById(@PathVariable Long id) {
			
		Expenses expenses = expensesRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Expense not existing with id :" + id));
		return ResponseEntity.ok(expenses); 
	}*/
	
/*	//update expenses rest api
	@PutMapping("/Budget/{pid}/Expenses/{eid}")
	public Expenses updateExpenses(@PathVariable (value = "pid") Long pid,
                @PathVariable (value = "eid") Long eid,
                @Validated @RequestBody Expenses expensesRequest) {
			if(!budgetRepository.existsById(pid)) {
				throw new ResourceNotFoundException("pid " + pid + " not found");
			}

			return expensesRepository.findById(eid).map(expenses -> {
				expenses.setExpenseName(expensesRequest.getExpenseName());
				expenses.setExpensePrice(expensesRequest.getExpensePrice());
				expenses.setExpenseDate(expensesRequest.getExpenseDate());
				
				return expensesRepository.save(expenses);
			}).orElseThrow(() -> new ResourceNotFoundException("eid " + eid + "not found"));
	}*/

	

}
