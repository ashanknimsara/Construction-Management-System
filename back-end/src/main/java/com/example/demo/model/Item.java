package com.stock.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="items")

public class Item {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long item_code;
	
	@Column(name="invoice_id")
	private String invoice_id;
	
	@Column(name="item_name")
	private String item_name;
	
	@Column(name="quantity")
	private double qty;
	
	@Column(name="availability")
	private String availability;
	
	public Item() { //default constructor
		
	}
	
	public Item(String invoice_id, String item_name, double qty, String availability) {
		super();
		this.invoice_id = invoice_id;
		this.item_name = item_name;
		this.qty = qty;
		this.availability = availability;
	}
	
	public long getItem_code() {
		return item_code;
	}
	public void setItem_code(long item_code) {
		this.item_code = item_code;
	}
	public String getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public String getAvailability() {
		return availability;
	}
	public void setAvailability(String availability) {
		this.availability = availability;
	}
	
	

}
