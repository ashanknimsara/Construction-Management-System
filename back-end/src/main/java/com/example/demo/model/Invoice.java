package com.constructionplanning.app.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long invoice_id;
    private String description;
    private String promised_date;
    private String issued_date;
    private double paid_amount;
    private double total_amount;
    private String payment_status;
    private String received_status;

    // This will join the table using foreign key of supplier within invoice table
    // when we fetch data,FetchType Eager will fetch supplier details as well
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "supplierId", referencedColumnName = "supId")
    private Supplier supplier;
    // This will create a new table which has references of both invoice and items
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "invoice_items", joinColumns = {
            @JoinColumn(name = "in_id", referencedColumnName = "invoice_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "it_code", referencedColumnName = "item_code") })
    private Set<Item> items = new HashSet<>();

    public Invoice(String description, String promised_date, String issued_date, double paid_amount,
            double total_amount, String payment_status, String received_status) {
        super();
        this.description = description;
        this.promised_date = promised_date;
        this.issued_date = issued_date;
        this.paid_amount = paid_amount;
        this.total_amount = total_amount;
        this.payment_status = payment_status;
        this.received_status = received_status;
    }

}
