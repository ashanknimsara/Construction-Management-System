package com.stock.demo.controller;

import java.util.HashMap;
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

import com.stock.demo.exception.ResourceNotFoundException;
import com.stock.demo.model.InformSupplier;
import com.stock.demo.repository.InformSupplierRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class InformSupplierController {
	
	@Autowired
	private InformSupplierRepository informSupplierRepository;
	
	//get all items
	@GetMapping("/informSupplier")
	public List<InformSupplier> getAllInformItems(){
		return informSupplierRepository.findAll();
	}
	
	//create inform
	@PostMapping("/informSupplier")
	public InformSupplier createInformItem(@RequestBody InformSupplier informSupplier) {
		return informSupplierRepository.save(informSupplier);
	}
	
	//get item by informId
	@GetMapping("/informSupplier/{informId}")
	public ResponseEntity<InformSupplier> getInformItemById(@PathVariable Long informId) {
		InformSupplier informSupplier = informSupplierRepository.findById(informId)
             .orElseThrow(() -> new ResourceNotFoundException("InformItems not exist with id :" + informId));
     // this is a 200 status
    return ResponseEntity.ok(informSupplier);
	}
	
	//update item rest api
	@PutMapping("/informSupplier/{informId}")
	public ResponseEntity<InformSupplier> getInformItemById(@PathVariable Long informId, @RequestBody InformSupplier informItemDetails){
		InformSupplier informSupplier = informSupplierRepository.findById(informId)
	             .orElseThrow(() -> new ResourceNotFoundException("Inform ID not exist with id :" + informId));
	     // this is a 200 status
	    
	    informSupplier.setSupplierId(informItemDetails.getSupplierId());
	    informSupplier.setItemCode(informItemDetails.getItemCode());
	    informSupplier.setItemName(informItemDetails.getItemName());
	    informSupplier.setQuantity(informItemDetails.getQuantity());
	    informSupplier.setDescription(informItemDetails.getDescription());
	    
	    InformSupplier updatedInformSupplier=informSupplierRepository.save(informSupplier);
	    return ResponseEntity.ok(updatedInformSupplier);
	}
	
	//delete informItem rest api
	@DeleteMapping("/informSupplier/{informId}")
	public ResponseEntity<Map<String, Boolean>> deleteInformItem(@PathVariable Long informId){
		InformSupplier informSupplier = informSupplierRepository.findById(informId)
	             .orElseThrow(() -> new ResourceNotFoundException("Inform Item not exist with id :" + informId));
		
		informSupplierRepository.delete(informSupplier);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
	
	
	

