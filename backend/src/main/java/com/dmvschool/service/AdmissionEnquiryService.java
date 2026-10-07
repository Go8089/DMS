package com.dmvschool.service;

import com.dmvschool.dto.AdmissionEnquiryRequest;
import com.dmvschool.entity.AdmissionEnquiry;
import com.dmvschool.repository.AdmissionEnquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionEnquiryService {

    private final AdmissionEnquiryRepository repository;

    public AdmissionEnquiryService(
            AdmissionEnquiryRepository repository
    ) {
        this.repository = repository;
    }

    public List<AdmissionEnquiry> getAllEnquiries() {
        return repository.findAll();
    }

    public AdmissionEnquiry getEnquiryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Admission enquiry not found"));
    }

    public AdmissionEnquiry createEnquiry(
            AdmissionEnquiryRequest request
    ) {
        AdmissionEnquiry enquiry = new AdmissionEnquiry();

    enquiry.setStudentName(request.getStudentName());
    enquiry.setParentName(request.getParentName());
    enquiry.setPhone(request.getPhone());
    enquiry.setEmail(request.getEmail());
    enquiry.setClassApplyingFor(request.getClassApplyingFor());
    enquiry.setMessage(request.getMessage());
    
    return repository.save(enquiry);
    }

    public void deleteEnquiry(Long id) {
        repository.deleteById(id);
    }
}