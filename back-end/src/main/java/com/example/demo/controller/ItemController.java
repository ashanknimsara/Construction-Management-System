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
import com.stock.demo.model.Item;
import com.stock.demo.repository.ItemRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ItemController {
	@Autowired
	private ItemRepository itemRepository;
	
	//get all items
	@GetMapping("/items")
	public List<Item> getAllItems(){
		return itemRepository.findAll();
	}
	
	//create item
	@PostMapping("/items")
	public Item createItem(@RequestBody Item item) {
		return itemRepository.save(item);
	}
	
	//get item by id
	@GetMapping("/items/{item_code}")
	public ResponseEntity<Item> getItemById(@PathVariable Long item_code) {
		Item item = itemRepository.findById(item_code)
             .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + item_code));
     // this is a 200 status
    return ResponseEntity.ok(item);
	}
	
	//update item rest api
	@PutMapping("/items/{item_code}")
	public ResponseEntity<Item> getItemById(@PathVariable Long item_code, @RequestBody Item itemDetails){
		Item item = itemRepository.findById(item_code)
	             .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + item_code));
	     // this is a 200 status
	    
	    item.setInvoice_id(itemDetails.getInvoice_id());
	    item.setItem_name(itemDetails.getItem_name());
	    item.setQty(itemDetails.getQty());
	    item.setAvailability(itemDetails.getAvailability());
	    
	    Item updatedItem=itemRepository.save(item);
	    return ResponseEntity.ok(updatedItem);
	}
	
	//delete employee rest api
	@DeleteMapping("/items/{item_code}")
	public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable Long item_code){
		Item item = itemRepository.findById(item_code)
	             .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + item_code));
		
		itemRepository.delete(item);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
