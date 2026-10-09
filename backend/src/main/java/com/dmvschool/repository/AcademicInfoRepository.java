package com.dmvschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dmvschool.entity.AcademicInfo;
public interface AcademicInfoRepository extends JpaRepository<AcademicInfo, Long> {
}