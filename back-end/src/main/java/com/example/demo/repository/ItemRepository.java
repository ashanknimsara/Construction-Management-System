package com.stock.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.demo.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{

}
