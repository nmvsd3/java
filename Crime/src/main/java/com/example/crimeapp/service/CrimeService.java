package com.example.crimeapp.service;

import com.example.crimeapp.model.Crime;
import com.example.crimeapp.repository.CrimeRepository;
import com.example.crimeapp.repository.DeletedCrimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrimeService {

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private DeletedCrimeRepository deletedCrimeRepository;

    // Add a new crime
    public Crime addCrime(Crime crime) {
        return crimeRepository.save(crime);
    }

    // Get all crimes
    public List<Crime> getAllCrimes() {
        return crimeRepository.findAll();
    }

    // Update crime by ID (for description and status)
    public Crime updateCrime(Long id, Crime crimeDetails) {
        Optional<Crime> crimeOptional = crimeRepository.findById(id);
        if (crimeOptional.isPresent()) {
            Crime existingCrime = crimeOptional.get();
            existingCrime.setDescription(crimeDetails.getDescription());
            existingCrime.setStatus(crimeDetails.getStatus());
            return crimeRepository.save(existingCrime); // Save the updated crime details
        }
        throw new RuntimeException("Crime not found");
    }

    // Delete a crime by ID and move it to the deleted table
    public void deleteCrime(Long id) {
        Optional<Crime> crimeOptional = crimeRepository.findById(id);
        if (crimeOptional.isPresent()) {
            Crime crime = crimeOptional.get();
            deletedCrimeRepository.save(crime); // Save to deleted crimes table
            crimeRepository.delete(crime); // Remove from active table
        }
    }

    // Get all deleted crimes
    public List<Crime> getDeletedCrimes() {
        return deletedCrimeRepository.findAll();
    }

    // Clear all deleted crimes
    public ResponseEntity<Void> clearDeletedCrimes() {
        deletedCrimeRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}