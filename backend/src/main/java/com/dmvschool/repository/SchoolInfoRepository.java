package com.dmvschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmvschool.entity.SchoolInfo;

public interface SchoolInfoRepository extends JpaRepository<SchoolInfo, Long>{

}
