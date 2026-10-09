package com.dmvschool.controller;

import com.dmvschool.entity.AdmissionInfo;
import com.dmvschool.service.AdmissionInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionInfoController {

    private final AdmissionInfoService service;

    public AdmissionInfoController(AdmissionInfoService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdmissionInfo> getActive() {
        return service.getActive();
    }

    @GetMapping("/{id}")
    public AdmissionInfo getById(@PathVariable Long id) {
        return service.getById(id);
    }
}