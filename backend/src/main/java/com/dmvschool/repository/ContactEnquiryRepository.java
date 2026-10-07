package com.dmvschool.repository;

import com.dmvschool.entity.ContactEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactEnquiryRepository
        extends JpaRepository<ContactEnquiry, Long> {
}