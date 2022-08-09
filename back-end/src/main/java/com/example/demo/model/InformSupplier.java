package com.stock.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="informSupplier")

public class InformSupplier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int informId;
	
	@Column(name="supplierId")
	private String supplierId;
	
	@Column(name="itemCode")
	private String itemCode;
	
	@Column(name="itemName")
	private String itemName;
	
	@Column(name="quantity")
	private long quantity;
	
	@Column(name="description")
	private String description;
	
	public InformSupplier() { //default constructor
		
	}
	
	public InformSupplier(String supplierId, String itemCode, String itemName, long quantity, String description) {
		super();
		this.supplierId = supplierId;
		this.itemCode = itemCode;
		this.itemName = itemName;
		this.quantity = quantity;
		this.description = description;
	}
	public int getInformId() {
		return informId;
	}
	public void setInformId(int informId) {
		this.informId = informId;
	}
	public String getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	

}
