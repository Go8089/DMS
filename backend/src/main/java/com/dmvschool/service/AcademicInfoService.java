package com.dmvschool.service;

import com.dmvschool.entity.AcademicInfo;
import com.dmvschool.repository.AcademicInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicInfoService {

    private final AcademicInfoRepository repository;

    public AcademicInfoService(AcademicInfoRepository repository) {
        this.repository = repository;
    }

    public List<AcademicInfo> getAll() {
        return repository.findAll();
    }

    public AcademicInfo getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic information not found"));
    }

    public AcademicInfo create(AcademicInfo academicInfo) {
        return repository.save(academicInfo);
    }

    public AcademicInfo update(Long id, AcademicInfo updated) {
        AcademicInfo existing = getById(id);

        existing.setSection(updated.getSection());
        existing.setDescription(updated.getDescription());
        existing.setClassesOffered(updated.getClassesOffered());
        existing.setSubjects(updated.getSubjects());
        existing.setCurriculum(updated.getCurriculum());
        existing.setAcademicCalendar(updated.getAcademicCalendar());
        existing.setExaminationSystem(updated.getExaminationSystem());
        existing.setRules(updated.getRules());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}