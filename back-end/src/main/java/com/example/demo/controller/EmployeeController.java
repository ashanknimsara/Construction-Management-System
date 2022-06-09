package com.constructionplanning.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.exception.ResourceNotFoundException;
import com.constructionplanning.model.Employee;
import com.constructionplanning.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	
	@GetMapping("/employee")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	//create employee rest api
	@PostMapping("/employee")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	//get employee by id rest api
	@GetMapping("/employee/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee= employeeRepository.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Employee not exist with id: " + id));
		return ResponseEntity.ok(employee);
	}
	
	//update employee rest api
	@PutMapping("/employee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
		Employee employee1= employeeRepository.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Employee not exist with id: " + id));
		
		employee1.setEmpName(employee.getEmpName());
		employee1.setAddress(employee.getAddress());
		employee1.setContactNo(employee.getContactNo());
		employee1.setNIC(employee.getNIC());
		employee1.setEmpType(employee.getEmpType());
		
		Employee updatedEmployee =employeeRepository.save(employee1);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	//delete employee rest api
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee= employeeRepository.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Employee not exist with id: " + id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
