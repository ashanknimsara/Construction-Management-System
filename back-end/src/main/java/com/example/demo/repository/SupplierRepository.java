package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.constructionplanning.app.model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
