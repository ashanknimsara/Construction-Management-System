package com.constructionplanning.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.app.model.Customer;
import com.constructionplanning.app.service.CustomerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    // get all Customers
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerService.fetchCustomers();
    }

}
