package com.example.demo.model;
import javax.persistence.*;

@Entity
@Table(name="machine")
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="machineCode")
    private String machineCode;

    @Column(name="machineName")
    private String machineName;


    @Column(name="rentalFee")
    private int rentalFee;

    public Machine(){

    }

    public Machine(String machineCode, String machineName, int rentalFee) {
        super();
        this.machineCode = machineCode;
        this.machineName = machineName;
        this.rentalFee = rentalFee;
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


    public int getRentalFee() {
        return rentalFee;
    }

    public void setRentalFee(int rentalFee) {
        this.rentalFee = rentalFee;
    }

}

