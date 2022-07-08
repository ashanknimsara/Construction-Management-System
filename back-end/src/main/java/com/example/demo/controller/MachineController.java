package com.constructionplanning.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.app.exception.ResourceNotFoundException;
import com.constructionplanning.app.model.Machine;
import com.constructionplanning.app.repository.MachineRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class MachineController {

    @Autowired
    private MachineRepository machineRepository;

    // get all machines
    @GetMapping("/machines")
    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    // create machine
    @PostMapping("/machines")
    public Machine createMachine(@RequestBody Machine machine) {
        return machineRepository.save(machine);
    }

    // get machine by id
    @GetMapping("/machines/{id}")
    public ResponseEntity<Machine> getMachineById(@PathVariable Long id) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not exist with id: " + id));
        return ResponseEntity.ok(machine);
    }

    // update machine rest api
    @PutMapping("/machines/{id}")
    public ResponseEntity<Machine> updateMachine(@PathVariable Long id, @RequestBody Machine machineDetails) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not exist with id: " + id));

        machine.setMachineCode(machineDetails.getMachineCode());
        machine.setMachineName(machineDetails.getMachineName());
        machine.setQuantity(machineDetails.getQuantity());
        machine.setRentalFee(machineDetails.getRentalFee());
        Machine updatedMachine = machineRepository.save(machine);
        return ResponseEntity.ok(updatedMachine);
    }

    // delete machine rest api
    @DeleteMapping("/machines/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMachine(@PathVariable Long id) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not exist with id: " + id));

        machineRepository.delete(machine);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
