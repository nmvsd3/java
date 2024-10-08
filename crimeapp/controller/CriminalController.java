package com.example.crimeapp.controller;

import com.example.crimeapp.model.Criminal;
import com.example.crimeapp.repository.CriminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/criminals")
@CrossOrigin(origins = "http://localhost:3000")  // Allow access from React frontend
public class CriminalController {

    @Autowired
    private CriminalRepository criminalRepository;

    // Add a new criminal with photo upload
    @PostMapping("/add")
    public ResponseEntity<Criminal> addCriminal(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("gender") String gender,
            @RequestParam("address") String address,
            @RequestParam("identifyingMark") String identifyingMark,
            @RequestParam("crimeArea") String crimeArea,
            @RequestParam("attachedCrime") String attachedCrime,
            @RequestParam("photo") MultipartFile photo
    ) throws IOException {
        
        // Save the uploaded photo file
        String photoFilename = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File uploadFile = new File(uploadDir + photoFilename);
        photo.transferTo(uploadFile);

        // Create and save the Criminal object
        Criminal criminal = new Criminal();
        criminal.setName(name);
        criminal.setAge(age);
        criminal.setGender(gender);
        criminal.setAddress(address);
        criminal.setIdentifyingMark(identifyingMark);
        criminal.setCrimeArea(crimeArea);
        criminal.setAttachedCrime(attachedCrime);
        criminal.setPhoto(photoFilename);  // Save the filename

        Criminal savedCriminal = criminalRepository.save(criminal);
        return ResponseEntity.ok(savedCriminal);
    }

    // Get all criminals
    @GetMapping("/all")
    public List<Criminal> getAllCriminals() {
        return criminalRepository.findAll();
    }
}
