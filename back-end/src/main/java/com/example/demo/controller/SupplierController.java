package com.constructionplanning.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.app.exception.ResourceNotFoundException;
import com.constructionplanning.app.model.Supplier;
import com.constructionplanning.app.repository.InvoiceRepository;
import com.constructionplanning.app.repository.SupplierRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class SupplierController {
    @Autowired
    SupplierRepository supplierRepository;
    InvoiceRepository invoiceRepository;

    @GetMapping("/suppliers")
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @PostMapping(path = "/suppliers", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        supplierRepository.save(supplier);
        return supplier;
    }

    @PutMapping(path = "/suppliers/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Supplier> saveOrUpdateInvoice(@PathVariable Long id, @RequestBody Supplier supplierDetails) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier with this is doesnot exist  : " + id));

        Supplier updated = supplierRepository.save(supplier);

        return ResponseEntity.ok(updated);
    }
}
