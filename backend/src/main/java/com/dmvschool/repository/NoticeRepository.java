package com.dmvschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmvschool.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{

}
