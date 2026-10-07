package com.dmvschool.controller;

import com.dmvschool.entity.Facility;
import com.dmvschool.service.FacilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final FacilityService service;

    public FacilityController(FacilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Facility> getAllFacilities() {
        return service.getAllFacilities();
    }

    @GetMapping("/{id}")
    public Facility getFacilityById(
            @PathVariable Long id
    ) {
        return service.getFacilityById(id);
    }

    @PostMapping
    public Facility createFacility(
            @RequestBody Facility facility
    ) {
        return service.createFacility(facility);
    }

    @PutMapping("/{id}")
    public Facility updateFacility(
            @PathVariable Long id,
            @RequestBody Facility facility
    ) {
        return service.updateFacility(id, facility);
    }

    @DeleteMapping("/{id}")
    public void deleteFacility(
            @PathVariable Long id
    ) {
        service.deleteFacility(id);
    }
}