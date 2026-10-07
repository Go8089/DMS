package com.dmvschool.controller.admin;

import com.dmvschool.entity.Faculty;
import com.dmvschool.service.FacultyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/faculty")
public class AdminFacultyController {

    private final FacultyService service;

    public AdminFacultyController(FacultyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return service.getAllFaculty();
    }

    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return service.getFacultyById(id);
    }

    @PostMapping
    public Faculty createFaculty(@RequestBody Faculty faculty) {
        return service.createFaculty(faculty);
    }

    @PutMapping("/{id}")
    public Faculty updateFaculty(
            @PathVariable Long id,
            @RequestBody Faculty faculty
    ) {
        return service.updateFaculty(id, faculty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        service.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }
}