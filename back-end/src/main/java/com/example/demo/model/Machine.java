package com.constructionplanning.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "machine")
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "machineCode")
    private String machineCode;

    @Column(name = "machineName")
    private String machineName;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "rentalFee")
    private int rentalFee;

    @Column(name = "rentedCount")
    private int rentedCount;

    @Column(name = "availableCount")
    private int availableCount;

    public Machine() {

    }

    public Machine(String machineCode, String machineName, int quantity, int rentalFee, int rentedCount,
            int availableCount) {
        super();
        this.machineCode = machineCode;
        this.machineName = machineName;
        this.quantity = quantity;
        this.rentalFee = rentalFee;
        this.rentedCount = rentedCount;
        this.availableCount = availableCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMachineCode() {
        return machineCode;
    }

    public void setMachineCode(String machineCode) {
        this.machineCode = machineCode;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getRentalFee() {
        return rentalFee;
    }

    public void setRentalFee(int rentalFee) {
        this.rentalFee = rentalFee;
    }

    public int getRentedCount() {
        return rentedCount;
    }

    public void setRentedCount(int rentedCount) {
        this.rentedCount = rentedCount;
    }

    public int getAvailableCount() {
        return availableCount;
    }

    public void setAvailableCount(int availableCount) {
        this.availableCount = availableCount;
    }
}
