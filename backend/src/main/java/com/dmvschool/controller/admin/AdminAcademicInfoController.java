package com.dmvschool.controller.admin;

import com.dmvschool.entity.AcademicInfo;
import com.dmvschool.service.AcademicInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/academics")
public class AdminAcademicInfoController {

    private final AcademicInfoService service;

    public AdminAcademicInfoController(AcademicInfoService service) {
        this.service = service;
    }

    @GetMapping
    public List<AcademicInfo> getAll() {
        return service.getAll();
    }

    @PostMapping
    public AcademicInfo create(@RequestBody AcademicInfo academicInfo) {
        return service.create(academicInfo);
    }

    @PutMapping("/{id}")
    public AcademicInfo update(
            @PathVariable Long id,
            @RequestBody AcademicInfo academicInfo
    ) {
        return service.update(id, academicInfo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}