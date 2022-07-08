package com.constructionplanning.app.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long item_code;
    private String item_name;
    private double qty;
    private String qty_type;
    private String availability;
    private double unit_price;

    // to avoid the recusive data fetching
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "items")
    private Set<Invoice> invoices = new HashSet<>();

    public Item(String item_name, double qty, String qty_type, String availability, double unit_price) {
        super();
        this.item_name = item_name;
        this.qty = qty;
        this.qty_type = qty_type;
        this.availability = availability;

        this.unit_price = unit_price;
    }

}
