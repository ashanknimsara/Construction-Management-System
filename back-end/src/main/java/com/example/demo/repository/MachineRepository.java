package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.constructionplanning.app.model.Machine;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
}
