package com.constructionplanning.app.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employee_salary")
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long salId;

    @Column(name = "empId")
    private long empId;

    @Column(name = "date")
    private Date date;

    @Column(name = "empName")
    private String empName;

    @Column(name = "OTHours")
    private int OTHours;

    @Column(name = "OTPayment")
    private int OTPayment;

    @Column(name = "totPay")
    private int totPay;

    public Salary() {

    }

    public Salary(long empId, Date date, String empName, int oTHours, int oTPayment, int totPay) {
        super();
        this.empId = empId;
        this.date = date;
        this.empName = empName;
        OTHours = oTHours;
        OTPayment = oTPayment;
        this.totPay = totPay;
    }

    public long getSalId() {
        return salId;
    }

    public void setSalId(long salId) {
        this.salId = salId;
    }

    public long getEmpId() {
        return empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public int getOTHours() {
        return OTHours;
    }

    public void setOTHours(int oTHours) {
        OTHours = oTHours;
    }

    public int getOTPayment() {
        return OTPayment;
    }

    public void setOTPayment(int oTPayment) {
        OTPayment = oTPayment;
    }

    public int getTotPay() {
        return totPay;
    }

    public void setTotPay(int totPay) {
        this.totPay = totPay;
    }

}
