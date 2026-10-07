package com.dmvschool.repository;

import com.dmvschool.entity.AdmissionEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionEnquiryRepository
        extends JpaRepository<AdmissionEnquiry, Long> {
}