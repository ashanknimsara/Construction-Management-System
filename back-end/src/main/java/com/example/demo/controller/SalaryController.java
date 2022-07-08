package com.constructionplanning.app.controller;

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

import com.constructionplanning.app.exception.ResourceNotFoundException;
import com.constructionplanning.app.model.Salary;
import com.constructionplanning.app.repository.SalaryRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class SalaryController {

    @Autowired
    private SalaryRepository salaryRepository;

    // get all Salary Details
    @GetMapping("/salaries")
    public List<Salary> getAllSalary() {
        return salaryRepository.findAll();
    }

    // create salary rest API
    @PostMapping("/salaries")
    public Salary createSalary(@RequestBody Salary salary) {
        return salaryRepository.save(salary);
    }

    // get salary by id rest API
    @GetMapping("/salaries/{salId}")
    public ResponseEntity<Salary> getSalaryById(@PathVariable Long salId) {
        Salary salary = salaryRepository.findById(salId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + salId));
        return ResponseEntity.ok(salary);
    }

    // Update salary rest API
    @PutMapping("/salaries/{salId}")
    public ResponseEntity<Salary> updateSalary(@PathVariable Long salId, @RequestBody Salary salaryDetails) {
        Salary salary = salaryRepository.findById(salId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + salId));
        salary.setEmpId(salaryDetails.getEmpId());
        salary.setDate(salaryDetails.getDate());
        salary.setEmpName(salaryDetails.getEmpName());
        salary.setOTHours(salaryDetails.getOTHours());
        salary.setOTPayment(salaryDetails.getOTPayment());
        salary.setTotPay(salaryDetails.getTotPay());

        Salary updateSalary = salaryRepository.save(salary);
        return ResponseEntity.ok(updateSalary);
    }

    @DeleteMapping("/salaries/{salId}")
    public ResponseEntity<Map<String, Boolean>> deleteSalary(@PathVariable Long salId) {
        Salary salary = salaryRepository.findById(salId)
                .orElseThrow(() -> new ResourceNotFoundException("Salary not exist with id: " + salId));

        salaryRepository.delete(salary);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
