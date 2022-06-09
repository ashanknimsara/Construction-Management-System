package com.example.demo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.transaction.Transactional;

@Entity
@Transactional
@Table(name="Expenses")

public class Expenses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long expenseId;
	
	@Column(name="expenseName")
	private String expenseName;
	
	@Column(name="expensePrice")
	private float expensePrice;
	
	@Column(name="expenseDate")
	private Date expenseDate;
	
	 /*@ManyToOne(cascade= CascadeType.ALL)
	 @JoinColumn(name = "PID")*/
	 //private Budget budget;
	 
	@Column(name="PID")
	 private Long PID;
		
	//overloaded constructor
	public Expenses(Long expenseId, String expenseName, float expensePrice, Date expenseDate, Budget budget, Long PID) {
		
		this.expenseId = expenseId;
		this.expenseName = expenseName;
		this.expensePrice = expensePrice;
		this.expenseDate = expenseDate;
		this.PID = PID;
		//this.budget = budget;
	}

	//default constructor
	public Expenses() {
		super();
	}

	//getters and setters
	public Long getExpenseId() {
		return expenseId;
	}


	public void setExpenseId(Long expenseId) {
		this.expenseId = expenseId;
	}


	public String getExpenseName() {
		return expenseName;
	}


	public void setExpenseName(String expenseName) {
		this.expenseName = expenseName;
	}


	public float getExpensePrice() {
		return expensePrice;
	}


	public void setExpensePrice(float expensePrice) {
		this.expensePrice = expensePrice;
	}


	public Date getExpenseDate() {
		return expenseDate;
	}


	public void setExpenseDate(Date expenseDate) {
		this.expenseDate = expenseDate;
	}
	
	public Long getPID() {
		return PID;
	}

	public void setPID(Long PID) {
		this.PID = PID;
	}

	/*public Budget getBudget() {
		return budget;
	}
	
	public void setBudget(Budget budget) {
		this.budget = budget;
	}
	*/
	
}
