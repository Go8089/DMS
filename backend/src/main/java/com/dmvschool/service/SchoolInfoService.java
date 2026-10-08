package com.dmvschool.service;

import com.dmvschool.entity.SchoolInfo;
import com.dmvschool.repository.SchoolInfoRepository;

import org.springframework.stereotype.Service;

@Service
public class SchoolInfoService {

    private final SchoolInfoRepository repository;

    public SchoolInfoService(SchoolInfoRepository repository) {
        this.repository = repository;
    }

    public SchoolInfo getSchoolInfo() {
        return repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    public SchoolInfo getSchoolInfoForAdmin() {
        return getSchoolInfo();
    }

    public SchoolInfo updateSchoolInfo(SchoolInfo updated) {
        SchoolInfo existing = getSchoolInfo();

        if (existing == null) {
            updated.setId(null);
            return repository.save(updated);
        }

        existing.setSchoolName(updated.getSchoolName());
        existing.setAddress(updated.getAddress());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setPrincipalName(updated.getPrincipalName());
        existing.setHistory(updated.getHistory());
        existing.setVision(updated.getVision());
        existing.setMission(updated.getMission());

        return repository.save(existing);
    }
}