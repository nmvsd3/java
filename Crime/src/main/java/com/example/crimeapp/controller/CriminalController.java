//package com.example.crimeapp.controller;
//
//import com.example.crimeapp.model.Criminal;
//import com.example.crimeapp.repository.CriminalRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/criminals")
//@CrossOrigin(origins = "http://localhost:3000")  
//public class CriminalController {
//
//    @Autowired
//    private CriminalRepository criminalRepository;
//
//    @PostMapping("/add")
//    public ResponseEntity<Criminal> addCriminal(
//            @RequestParam("name") String name,
//            @RequestParam("age") int age,
//            @RequestParam("gender") String gender,
//            @RequestParam("address") String address,
//            @RequestParam("identifyingMark") String identifyingMark,
//            @RequestParam("crimeArea") String crimeArea,
//
//            @RequestParam("photo") MultipartFile photo
//    ) throws IOException {
//        
//       
//        String photoFilename = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
//        String uploadDir = System.getProperty("user.dir") + "/uploads/";
//        File uploadFile = new File(uploadDir + photoFilename);
//        photo.transferTo(uploadFile);
//
//       
//        Criminal criminal = new Criminal();
//        criminal.setName(name);
//        criminal.setAge(age);
//        criminal.setGender(gender);
//        criminal.setAddress(address);
//        criminal.setIdentifyingMark(identifyingMark);
//        criminal.setCrimeArea(crimeArea);
//      
//        criminal.setPhoto(photoFilename);  
//
//        Criminal savedCriminal = criminalRepository.save(criminal);
//        return ResponseEntity.ok(savedCriminal);
//    }
//
//   
//    @GetMapping("/all")
//    public List<Criminal> getAllCriminals() {
//        return criminalRepository.findAll();
//    }
//}


package com.example.crimeapp.controller;

import com.example.crimeapp.model.Criminal;
import com.example.crimeapp.repository.CriminalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.qos.logback.core.joran.util.StringToObjectConverter;

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
@CrossOrigin(origins = "http://localhost:3000") 
public class CriminalController {

    @Autowired
    private CriminalRepository criminalRepository;

    @PostMapping(value="/add")
    public ResponseEntity<Criminal> addCriminal(
            @RequestParam("criminal") String criminal,  
            @RequestParam("photo") MultipartFile photo    
    ) throws IOException {

             ObjectMapper objectMapper =    new ObjectMapper();
            Criminal criminal1 =   objectMapper.readValue(criminal, Criminal.class);
           System.out.println(photo.getSize());
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

  
        String photoFilename = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
        File uploadFile = new File(uploadDir + photoFilename);

       
        photo.transferTo(uploadFile);

        
        criminal1.setPhoto(photoFilename);

        
        Criminal savedCriminal = criminalRepository.save(criminal1);

        return ResponseEntity.ok(savedCriminal);
    }

    @GetMapping("/all")
    public List<Criminal> getAllCriminals() {
        return criminalRepository.findAll();
    }
}
