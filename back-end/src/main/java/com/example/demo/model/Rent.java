package com.example.demo.model;
import javax.persistence.*;

@Entity
@Table(name="rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="date")
    private String date;

    @Column(name="customerName")
    private String customerName;

    @Column(name="nic")
    private String nic;

    @Column(name="machineName")
    private String machineName;

    @Column(name="rentalFee")
    private String rentalFee;

    @Column(name="quantity")
    private int quantity;

    @Column(name="noOfDays")
    private int noOfDays;


    public Rent(){

    }

    public Rent(String date, String customerName, String nic, String machineName, String rentalFee, int quantity, int noOfDays) {
        super();
        this.date = date;
        this.customerName = customerName;
        this.nic = nic;
        this.machineName = machineName;
        this.rentalFee = rentalFee;
        this.quantity = quantity;
        this.noOfDays = noOfDays;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }


    public String getMachineName() {
        return machineName;
    }

    public void setRentalFee(String rentalFee) {
        this.rentalFee = rentalFee;
    }

    public String getRentalFee() {
        return rentalFee;
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

    public int getNoOfDays() {
        return noOfDays;
    }

    public void setNoOfDays(int noOfDays) {
        this.noOfDays = noOfDays;
    }

}
