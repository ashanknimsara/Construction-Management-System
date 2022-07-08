package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.constructionplanning.app.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
