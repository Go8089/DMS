package com.dmvschool.controller.admin;

import com.dmvschool.entity.AdmissionInfo;
import com.dmvschool.service.AdmissionInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/admissions")
public class AdminAdmissionInfoController {

    private final AdmissionInfoService service;

    public AdminAdmissionInfoController(AdmissionInfoService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdmissionInfo> getAll() {
        return service.getAll();
    }

    @PostMapping
    public AdmissionInfo create(@RequestBody AdmissionInfo info) {
        return service.create(info);
    }

    @PutMapping("/{id}")
    public AdmissionInfo update(
            @PathVariable Long id,
            @RequestBody AdmissionInfo info
    ) {
        return service.update(id, info);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}