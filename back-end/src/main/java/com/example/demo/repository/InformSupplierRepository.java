package com.stock.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.demo.model.InformSupplier;
@Repository
public interface InformSupplierRepository extends JpaRepository <InformSupplier, Long> {

}
