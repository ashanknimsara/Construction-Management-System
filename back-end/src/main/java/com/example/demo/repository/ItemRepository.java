package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.constructionplanning.app.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
