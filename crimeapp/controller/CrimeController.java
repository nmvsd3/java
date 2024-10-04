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

    
    @PostMapping("/add")
    public ResponseEntity<Crime> addCrime(@RequestBody Crime crime) {
        return  new ResponseEntity<Crime>(crimeService.addCrime(crime), HttpStatus.CREATED);
    }
    

    
    @GetMapping("/all")
    public List<Crime> getAllCrimes() {
        return crimeService.getAllCrimes();
    }
}