package com.dmvschool.controller;

import com.dmvschool.dto.AdmissionEnquiryRequest;
import com.dmvschool.entity.AdmissionEnquiry;
import com.dmvschool.service.AdmissionEnquiryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionEnquiryController {

    private final AdmissionEnquiryService service;

    public AdmissionEnquiryController(
            AdmissionEnquiryService service
    ) {
        this.service = service;
    }

    @GetMapping("/enquiries")
    public List<AdmissionEnquiry> getAllEnquiries() {
        return service.getAllEnquiries();
    }

    @GetMapping("/enquiries/{id}")
    public AdmissionEnquiry getEnquiryById(
            @PathVariable Long id
    ) {
        return service.getEnquiryById(id);
    }

    @PostMapping("/enquiries")
    public AdmissionEnquiry createEnquiry(
           @Valid @RequestBody AdmissionEnquiryRequest enquiry
    ) {
        return service.createEnquiry(enquiry);
    }

    @DeleteMapping("/enquiries/{id}")
    public void deleteEnquiry(
            @PathVariable Long id
    ) {
        service.deleteEnquiry(id);
    }
}