package com.dmvschool.service;

import com.dmvschool.entity.AdmissionInfo;
import com.dmvschool.repository.AdmissionInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionInfoService {

    private final AdmissionInfoRepository repository;

    public AdmissionInfoService(AdmissionInfoRepository repository) {
        this.repository = repository;
    }

    public List<AdmissionInfo> getActive() {
        return repository.findByActiveTrue();
    }

    public List<AdmissionInfo> getAll() {
        return repository.findAll();
    }

    public AdmissionInfo getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Admission information not found"));
    }

    public AdmissionInfo create(AdmissionInfo info) {
        return repository.save(info);
    }

    public AdmissionInfo update(Long id, AdmissionInfo updated) {
        AdmissionInfo existing = getById(id);

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setProcedure(updated.getProcedure());
        existing.setEligibility(updated.getEligibility());
        existing.setRequiredDocuments(updated.getRequiredDocuments());
        existing.setAdmissionDates(updated.getAdmissionDates());
        existing.setFeeDetails(updated.getFeeDetails());
        existing.setApplicationFormUrl(updated.getApplicationFormUrl());
        existing.setBrochureUrl(updated.getBrochureUrl());
        existing.setActive(updated.getActive());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}