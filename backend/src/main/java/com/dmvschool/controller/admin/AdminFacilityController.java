package com.dmvschool.controller.admin;

import com.dmvschool.entity.Facility;
import com.dmvschool.service.FacilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/facilities")
public class AdminFacilityController {

    private final FacilityService service;

    public AdminFacilityController(FacilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Facility> getAllFacilities() {
        return service.getAllFacilities();
    }

    @GetMapping("/{id}")
    public Facility getFacilityById(@PathVariable Long id) {
        return service.getFacilityById(id);
    }

    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) {
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
    public ResponseEntity<Void> deleteFacility(@PathVariable Long id) {
        service.deleteFacility(id);
        return ResponseEntity.noContent().build();
    }
}