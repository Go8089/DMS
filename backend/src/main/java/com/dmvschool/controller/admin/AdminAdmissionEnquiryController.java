package com.dmvschool.controller.admin;

import com.dmvschool.entity.AdmissionEnquiry;
import com.dmvschool.service.AdmissionEnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/admissions/enquiries")
public class AdminAdmissionEnquiryController {

    private final AdmissionEnquiryService service;

    public AdminAdmissionEnquiryController(
            AdmissionEnquiryService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<AdmissionEnquiry> getAllEnquiries() {
        return service.getAllEnquiries();
    }

    @GetMapping("/{id}")
    public AdmissionEnquiry getEnquiryById(@PathVariable Long id) {
        return service.getEnquiryById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnquiry(
            @PathVariable Long id
    ) {
        service.deleteEnquiry(id);
        return ResponseEntity.noContent().build();
    }
}