package com.example.crimeapp.repository;

import com.example.crimeapp.model.Crime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedCrimeRepository extends JpaRepository<Crime, Long> {
    // Additional custom query methods can be defined here if needed
}
