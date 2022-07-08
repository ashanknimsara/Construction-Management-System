package com.constructionplanning.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.constructionplanning.app.model.Quotation;
import com.constructionplanning.app.service.QuotationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class QuotationController {
    @Autowired
    QuotationService quotationService;

    // get all Quotations
    @GetMapping("/quotations")
    public List<Quotation> getAllQuotations() {
        return quotationService.fetchQuotations();
    }

    @PostMapping(path = "/quotations")
    public Quotation addQuotation(@RequestBody Quotation quotation) {

        return quotationService.saveQuotation(quotation);
    }

    @PutMapping(path = "/quotations/{id}")
    public ResponseEntity<Quotation> saveOrUpdateQuotation(@PathVariable Long id,
            @RequestBody Quotation quotationDetails) {
        return quotationService.updateQuotation(id, quotationDetails);
    }

    @GetMapping("/quotations/{id}")
    public ResponseEntity<Quotation> getQuotationById(@PathVariable Long id) {
        return quotationService.fetchQuotationDetails(id);

    }

    @DeleteMapping("/quotations/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteQuotation(@PathVariable Long id) {

        return quotationService.removeQuotation(id);
    }
}
