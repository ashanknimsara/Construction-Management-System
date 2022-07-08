package com.constructionplanning.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.constructionplanning.app.model.Customer;
import com.constructionplanning.app.repository.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> fetchCustomers() {
        // TODO Auto-generated method stub
        return customerRepository.findAll();
    }
}
