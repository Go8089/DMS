package com.dmvschool.controller;

import com.dmvschool.dto.ContactEnquiryRequest;
import com.dmvschool.entity.ContactEnquiry;
import com.dmvschool.service.ContactEnquiryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactEnquiryController {

    private final ContactEnquiryService service;

    public ContactEnquiryController(
            ContactEnquiryService service
    ) {
        this.service = service;
    }

    @GetMapping("/enquiries")
    public List<ContactEnquiry> getAllEnquiries() {
        return service.getAllEnquiries();
    }

    @GetMapping("/enquiries/{id}")
    public ContactEnquiry getEnquiryById(
            @PathVariable Long id
    ) {
        return service.getEnquiryById(id);
    }

    @PostMapping("/enquiries")
    public ContactEnquiry createEnquiry(
          @Valid @RequestBody ContactEnquiryRequest enquiry
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