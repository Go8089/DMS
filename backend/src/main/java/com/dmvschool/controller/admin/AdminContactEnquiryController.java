package com.dmvschool.controller.admin;

import com.dmvschool.entity.ContactEnquiry;
import com.dmvschool.service.ContactEnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contact/enquiries")
public class AdminContactEnquiryController {

    private final ContactEnquiryService service;

    public AdminContactEnquiryController(
            ContactEnquiryService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<ContactEnquiry> getAllEnquiries() {
        return service.getAllEnquiries();
    }

    @GetMapping("/{id}")
    public ContactEnquiry getEnquiryById(@PathVariable Long id) {
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