package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.constructionplanning.app.model.Salary;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {

}
