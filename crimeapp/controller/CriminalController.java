package com.example.crimeapp.controller;

import com.example.crimeapp.model.Criminal;
import com.example.crimeapp.repository.CriminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/criminals")
@CrossOrigin(origins = "http://localhost:3000")  // React frontend access
public class CriminalController {

    @Autowired
    private CriminalRepository criminalRepository;

    // Add a new criminal
    @PostMapping("/add")
    public ResponseEntity<Criminal> addCriminal(@RequestBody Criminal criminal) {
        Criminal savedCriminal = criminalRepository.save(criminal);
        return ResponseEntity.ok(savedCriminal);
    }

    // Get all criminals
    @GetMapping("/all")
    public List<Criminal> getAllCriminals() {
        return criminalRepository.findAll();
    }
}
