package com.constructionplanning.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.app.model.Invoice;
import com.constructionplanning.app.service.InvoiceService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;

    // get all invoices rest api
    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices() {
        return invoiceService.fetchInvoices();
    }

    // create invoice rest api
    @PostMapping(path = "/invoices", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Invoice addInvoice(@RequestBody Invoice invoice) {

        return invoiceService.saveInvoice(invoice);
    }

    // update invoice rest api
    @PutMapping(path = "/invoices/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Invoice> saveOrUpdateInvoice(@PathVariable Long id, @RequestBody Invoice invoiceDetails) {
        return invoiceService.updateInvoice(id, invoiceDetails);
    }

    // get invoice rest api
    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return invoiceService.fetchInvoiceDetails(id);

    }

    // delete invoice rest api call
    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteInvoice(@PathVariable Long id) {

        return invoiceService.removeInvoice(id);
    }

}
