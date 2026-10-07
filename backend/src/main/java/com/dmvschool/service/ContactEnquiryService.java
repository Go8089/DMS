package com.dmvschool.service;

import com.dmvschool.dto.ContactEnquiryRequest;
import com.dmvschool.entity.ContactEnquiry;
import com.dmvschool.repository.ContactEnquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactEnquiryService {

    private final ContactEnquiryRepository repository;

    public ContactEnquiryService(
            ContactEnquiryRepository repository
    ) {
        this.repository = repository;
    }

    public List<ContactEnquiry> getAllEnquiries() {
        return repository.findAll();
    }

    public ContactEnquiry getEnquiryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contact enquiry not found"));
    }

    public ContactEnquiry createEnquiry(
            ContactEnquiryRequest request
    ) {
        ContactEnquiry enquiry = new ContactEnquiry();

    enquiry.setName(request.getName());
    enquiry.setPhone(request.getPhone());
    enquiry.setEmail(request.getEmail());
    enquiry.setSubject(request.getSubject());
    enquiry.setMessage(request.getMessage());
    
    return repository.save(enquiry);
    }

    public void deleteEnquiry(Long id) {
        repository.deleteById(id);
    }
}