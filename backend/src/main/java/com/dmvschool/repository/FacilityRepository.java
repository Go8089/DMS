package com.dmvschool.repository;

import com.dmvschool.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityRepository
        extends JpaRepository<Facility, Long> {

    List<Facility> findByActiveTrue();
}