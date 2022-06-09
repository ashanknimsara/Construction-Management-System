package com.example.demo.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.transaction.Transactional;


@Entity
@Transactional
@Table(name="Budget")

public class Budget {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long PID;
	
	@Column(name="Pname")
		private String Pname;
	@Column(name="budget")
		private float budget;
	@Column(name="status")
		private String status;
	
	//unidirectional one-to-many
	//@OneToMany(targetEntity = Expenses.class,cascade = CascadeType.ALL)
	//@JoinColumn(name = "PID_fk", referencedColumnName = "PID")
	
	/*@OneToMany(fetch = FetchType.EAGER,mappedBy="budget",cascade = CascadeType.ALL)
	private Set<Expenses> Expenses;*/
	
	//Default constructor
	public Budget() {
		
	}
	
	//overloaded constructor
	public Budget(long pID, String pname, float budget, String status, Set<Expenses> Expenses) {
		super();
		PID = pID;
		Pname = pname;
		this.budget = budget;
		this.status = status;
		//this.Expenses = Expenses;
	}

	//getters
	public long getPID() {
		return PID;
	}

	public String getPname() {
		return Pname;
	}

	public float getBudget() {
		return budget;
	}

	public String getStatus() {
		return status;
	}
	
//	public Set<Expenses> Expenses(){
//		return Expenses;
//	}

	//setters
	public void setPID(long pID) {
		PID = pID;
	}

	public void setPname(String pname) {
		Pname = pname;
	}

	public void setBudget(float budget) {
		this.budget = budget;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
//	public void setExpenses (Set<Expenses> Expenses) {
//		this.Expenses = Expenses;
//	}
	
	

}
