package com.example.crimeapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Criminal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private int age;
    private String gender;
    private String address;
    private String identifyingMark;
    private String crimeArea;
    private String attachedCrime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getIdentifyingMark() {
		return identifyingMark;
	}
	public void setIdentifyingMark(String identifyingMark) {
		this.identifyingMark = identifyingMark;
	}
	public String getCrimeArea() {
		return crimeArea;
	}
	public void setCrimeArea(String crimeArea) {
		this.crimeArea = crimeArea;
	}
	public String getAttachedCrime() {
		return attachedCrime;
	}
	public void setAttachedCrime(String attachedCrime) {
		this.attachedCrime = attachedCrime;
	}

    // Getters and Setters
}
