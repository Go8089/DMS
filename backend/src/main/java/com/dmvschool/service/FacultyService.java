package com.dmvschool.service;

import com.dmvschool.entity.Faculty;
import com.dmvschool.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository repository;

    public FacultyService(FacultyRepository repository) {
        this.repository = repository;
    }

    public List<Faculty> getAllFaculty() {
        return repository.findAll();
    }

    public Faculty getFacultyById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Faculty not found"));
    }

    public List<Faculty> getPrincipal() {
        return repository.findByPrincipal(true);
    }

    public List<Faculty> getByDepartment(String department) {
        return repository.findByDepartment(department);
    }

    public Faculty createFaculty(Faculty faculty) {
        return repository.save(faculty);
    }

    public Faculty updateFaculty(
            Long id,
            Faculty updatedFaculty
    ) {
        Faculty faculty = getFacultyById(id);

        faculty.setName(updatedFaculty.getName());
        faculty.setDesignation(updatedFaculty.getDesignation());
        faculty.setDepartment(updatedFaculty.getDepartment());
        faculty.setQualification(updatedFaculty.getQualification());
        faculty.setDescription(updatedFaculty.getDescription());
        faculty.setEmail(updatedFaculty.getEmail());
        faculty.setPhone(updatedFaculty.getPhone());
        faculty.setImageUrl(updatedFaculty.getImageUrl());
        faculty.setPrincipal(updatedFaculty.getPrincipal());

        return repository.save(faculty);
    }

    public void deleteFaculty(Long id) {
        repository.deleteById(id);
    }
}