package com.constructionplanning.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.constructionplanning.app.exception.ResourceNotFoundException;
import com.constructionplanning.app.model.Quotation;
import com.constructionplanning.app.repository.CustomerRepository;
import com.constructionplanning.app.repository.QuotationRepository;

@Service
public class QuotationService {
    @Autowired
    QuotationRepository quotationRepository;

    @Autowired
    CustomerRepository customerRepository;

    public Quotation saveQuotation(Quotation quotation) {
        // TODO Auto-generated method stub
        return quotationRepository.save(quotation);
    }

    public ResponseEntity<Quotation> updateQuotation(Long id, Quotation quotationDetails) {
        Quotation quotation = quotationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quotation does not exist with id :" + id));
        return ResponseEntity.ok(quotationRepository.save(quotationDetails));
    }

    public List<Quotation> fetchQuotations() {
        // TODO Auto-generated method stub
        return quotationRepository.findAll();
    }

    public ResponseEntity<Map<String, Boolean>> removeQuotation(Long id) {
        Quotation quotation = quotationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quotation does not exist with id :" + id));
        quotationRepository.delete(quotation);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Quotation> fetchQuotationDetails(Long id) {
        // TODO Auto-generated method stub
        Quotation quotation = quotationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice does not exist with id :" + id));
        // this is a 200 status
        return ResponseEntity.ok(quotation);
    }

}
