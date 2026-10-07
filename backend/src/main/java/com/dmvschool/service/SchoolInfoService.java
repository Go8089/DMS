package com.dmvschool.service;

import org.springframework.stereotype.Service;

import com.dmvschool.entity.SchoolInfo;
import com.dmvschool.repository.SchoolInfoRepository;
import  java.util.List;
@Service 
public class SchoolInfoService {
   private final SchoolInfoRepository repository;

    public SchoolInfoService(SchoolInfoRepository repository) {
        this.repository = repository;
    }

    public List<SchoolInfo> getSchoolInfo() {
        return repository.findAll();
    } 
}
