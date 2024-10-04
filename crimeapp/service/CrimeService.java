package com.example.crimeapp.service;

import com.example.crimeapp.model.Crime;
import com.example.crimeapp.repository.CrimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrimeService {

    @Autowired
    private CrimeRepository crimeRepository;

    // Add a new crime
    public Crime addCrime(Crime crime) {
        return crimeRepository.save(crime);
    }

    // Get all crimes
    public List<Crime> getAllCrimes() {
        return crimeRepository.findAll();
    }
}