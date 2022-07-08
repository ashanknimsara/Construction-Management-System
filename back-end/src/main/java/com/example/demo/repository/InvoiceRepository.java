package com.constructionplanning.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.constructionplanning.app.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}
