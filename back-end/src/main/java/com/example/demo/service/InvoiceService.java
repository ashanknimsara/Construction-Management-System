package com.constructionplanning.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.constructionplanning.app.exception.ResourceNotFoundException;
import com.constructionplanning.app.model.Invoice;
import com.constructionplanning.app.repository.InvoiceRepository;
import com.constructionplanning.app.repository.ItemRepository;
import com.constructionplanning.app.repository.SupplierRepository;

@Service
public class InvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;
    @Autowired
    SupplierRepository supplierRepository;
    @Autowired
    ItemRepository itemRepository;

    public Invoice saveInvoice(Invoice invoice) {

        if (!supplierRepository.existsById(invoice.getSupplier().getSupId())) {
            supplierRepository.save(invoice.getSupplier());
        }
        invoice.getItems().stream().map(item -> {
            if (!itemRepository.existsById(item.getItem_code())) {
                itemRepository.save(item);
            }
            return item;
        }).collect(Collectors.toList());

        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices() {
        return invoiceRepository.findAll();

    }

    public ResponseEntity<Invoice> updateInvoice(Long id, Invoice invoiceDetails) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not exist with id : " + id));
        invoice.setPromised_date(invoiceDetails.getPromised_date());
        invoice.setPaid_amount(invoiceDetails.getPaid_amount());

        invoice.setPayment_status(invoiceDetails.getPayment_status());
        invoice.setReceived_status(invoiceDetails.getReceived_status());
        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return ResponseEntity.ok(updatedInvoice);

    }

    public ResponseEntity<Invoice> fetchInvoiceDetails(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice does not exist with id :" + id));
        // this is a 200 status
        return ResponseEntity.ok(invoice);
    }

    public ResponseEntity<Map<String, Boolean>> removeInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice does not exist with id :" + id));
        invoiceRepository.delete(invoice);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
