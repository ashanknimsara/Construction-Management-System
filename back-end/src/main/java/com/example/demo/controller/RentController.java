package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Rent;
import com.example.demo.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class RentController {

    @Autowired
    private RentRepository rentRepository;
    //get all rents
    @GetMapping("/rents")
    public List<Rent> getAllRents(){
        return rentRepository.findAll();
    }

    //create rent
    @PostMapping("/rents")
    public Rent createRent(@RequestBody Rent rent){
        return rentRepository.save(rent);
    }

    //get rent by id
    @GetMapping("/rents/{id}")
    public ResponseEntity<Rent> getRentById(@PathVariable Long id){
        Rent rent=rentRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("rent not exist with id: "+id));
        return ResponseEntity.ok(rent);
    }

    //delete rent rest api
    @DeleteMapping("/rents/{id}")
    public ResponseEntity <Map<String, Boolean>> deleteRent(@PathVariable Long id){
        Rent rent=rentRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("Rent not exist with id: "+id));

        rentRepository.delete(rent);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}