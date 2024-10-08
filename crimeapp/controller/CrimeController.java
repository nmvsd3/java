package com.example.crimeapp.controller;

import com.example.crimeapp.model.Crime;
import com.example.crimeapp.service.CrimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crimes")
@CrossOrigin(origins = {"http://localhost:3000"}) 
public class CrimeController {

    @Autowired
    private CrimeService crimeService;

    // Add a new crime
    @PostMapping("/add")
    public ResponseEntity<Crime> addCrime(@RequestBody Crime crime) {
        return new ResponseEntity<>(crimeService.addCrime(crime), HttpStatus.CREATED);
    }

    // Fetch all crimes
    @GetMapping("/all")
    public List<Crime> getAllCrimes() {
        return crimeService.getAllCrimes();
    }

    // Update crime (edit description and status)
    @PutMapping("/{id}")
    public ResponseEntity<Crime> updateCrime(@PathVariable Long id, @RequestBody Crime crime) {
        Crime updatedCrime = crimeService.updateCrime(id, crime);
        return new ResponseEntity<>(updatedCrime, HttpStatus.OK); // Return the updated crime
    }

    // Delete a crime (move to deleted crimes)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCrime(@PathVariable Long id) {
        crimeService.deleteCrime(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Fetch all deleted crimes
    @GetMapping("/deleted")
    public List<Crime> getDeletedCrimes() {
        return crimeService.getDeletedCrimes();
    }

    // Clear all deleted crimes
    @DeleteMapping("/clearDeleted")
    public ResponseEntity<Void> clearDeletedCrimes() {
        crimeService.clearDeletedCrimes();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
