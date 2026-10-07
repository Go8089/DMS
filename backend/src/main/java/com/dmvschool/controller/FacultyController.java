package com.dmvschool.controller;

import com.dmvschool.entity.Faculty;
import com.dmvschool.service.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final FacultyService service;

    public FacultyController(FacultyService service) {
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

    @GetMapping("/principal")
    public List<Faculty> getPrincipal() {
        return service.getPrincipal();
    }

    @GetMapping("/department/{department}")
    public List<Faculty> getDepartment(
            @PathVariable String department
    ) {
        return service.getByDepartment(department);
    }

    @PostMapping
    public Faculty createFaculty(
            @RequestBody Faculty faculty
    ) {
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
    public void deleteFaculty(@PathVariable Long id) {
        service.deleteFaculty(id);
    }
}