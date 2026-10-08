package com.dmvschool.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmvschool.entity.SchoolInfo;
import com.dmvschool.service.SchoolInfoService;

@RestController 
@RequestMapping ("api/school")
public class SchoolInfoController {
   private final SchoolInfoService service;

    public SchoolInfoController(SchoolInfoService service) {
        this.service = service;
    }

    @GetMapping
    public SchoolInfo getSchoolInfo() {
        return service.getSchoolInfo();
    } 
}
