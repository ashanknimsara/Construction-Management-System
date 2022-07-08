package com.constructionplanning.app.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "quotation")
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quotaion_id;
    private String project_type;
    private String expected_before;
    private double expected_price;
    private String project_description;
    private String location;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "customer_Id", referencedColumnName = "cusId")
    private Customer customer;

    public Quotation(String project_type, String expected_before, double expected_price, String project_description,
            String location) {
        super();
        this.project_type = project_type;
        this.expected_before = expected_before;
        this.expected_price = expected_price;
        this.project_description = project_description;
        this.location = location;

    }

}
