package com.dmvschool.controller.admin;

import com.dmvschool.entity.SchoolInfo;
import com.dmvschool.service.SchoolInfoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/school")
public class AdminSchoolController {

    private final SchoolInfoService service;

    public AdminSchoolController(SchoolInfoService service) {
        this.service = service;
    }

    @GetMapping
    public SchoolInfo getSchoolInfo() {
        return service.getSchoolInfoForAdmin();
    }

    @PutMapping
    public SchoolInfo updateSchoolInfo(
            @RequestBody SchoolInfo schoolInfo
    ) {
        return service.updateSchoolInfo(schoolInfo);
    }
}