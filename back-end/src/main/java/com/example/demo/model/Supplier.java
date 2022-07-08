package com.constructionplanning.app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supId;
    private String supplierName;
    private String phoneNumber;
    private String email;
    private String supplierAddress;

    public Supplier(String supplierName, String phoneNumber, String email, String supplierAddress) {
        super();
        this.supplierName = supplierName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.supplierAddress = supplierAddress;

    }

}
