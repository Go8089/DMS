package com.dmvschool.repository;

import com.dmvschool.entity.AdmissionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdmissionInfoRepository
        extends JpaRepository<AdmissionInfo, Long> {

    List<AdmissionInfo> findByActiveTrue();
}