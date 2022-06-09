package com.constructionplanning.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Employee")
public class Employee {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
			private long EmpID;
		
		@Column(name="EmpName")
			private String EmpName;
		@Column(name="NIC")
			private String NIC;
		@Column(name="ContactNo")
			private String ContactNo;
		@Column(name="Address")
			private String Address;
		@Column(name="EmpType")
			private String EmpType;
			
			public Employee() {
				
			}
			
			//constructor
			public Employee(String empName, String nIC, String contactNo, String address, String empType) {
				super();
				EmpName = empName;
				NIC = nIC;
				ContactNo = contactNo;
				Address = address;
				EmpType = empType;
			}
			//getters
			public long getEmpID() {
				return EmpID;
			}
			public String getEmpName() {
				return EmpName;
			}
			public String getNIC() {
				return NIC;
			}
			public String getContactNo() {
				return ContactNo;
			}
			public String getAddress() {
				return Address;
			}
			public String getEmpType() {
				return EmpType;
			}
			
			// setters
			public void setEmpID(long empID) {
				EmpID = empID;
			}
			public void setEmpName(String empName) {
				EmpName = empName;
			}
			public void setNIC(String nIC) {
				NIC = nIC;
			}
			public void setContactNo(String contactNo) {
				ContactNo = contactNo;
			}
			public void setAddress(String address) {
				Address = address;
			}
			public void setEmpType(String empType) {
				EmpType = empType;
			}
			
}
