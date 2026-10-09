package com.dmvschool.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dmvschool.entity.AcademicInfo;
import com.dmvschool.service.AcademicInfoService;

@RestController
@RequestMapping("/api/academics")
public class AcademicInfoController {

    private final AcademicInfoService service;

    public AcademicInfoController(AcademicInfoService service) {
        this.service = service;
    }

    @GetMapping
    public List<AcademicInfo> getAll() {
        return service.getAll();
    }
}


