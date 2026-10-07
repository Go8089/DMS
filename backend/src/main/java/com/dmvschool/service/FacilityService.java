package com.dmvschool.service;

import com.dmvschool.entity.Facility;
import com.dmvschool.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {

    private final FacilityRepository repository;

    public FacilityService(FacilityRepository repository) {
        this.repository = repository;
    }

    public List<Facility> getAllFacilities() {
        return repository.findByActiveTrue();
    }

    public Facility getFacilityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Facility not found"));
    }

    public Facility createFacility(Facility facility) {
        return repository.save(facility);
    }

    public Facility updateFacility(
            Long id,
            Facility updatedFacility
    ) {
        Facility facility = getFacilityById(id);

        facility.setName(updatedFacility.getName());
        facility.setDescription(updatedFacility.getDescription());
        facility.setImageUrl(updatedFacility.getImageUrl());
        facility.setActive(updatedFacility.getActive());

        return repository.save(facility);
    }

    public void deleteFacility(Long id) {
        repository.deleteById(id);
    }
}