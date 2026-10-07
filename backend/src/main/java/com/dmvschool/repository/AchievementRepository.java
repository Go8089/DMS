package com.dmvschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmvschool.entity.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

}
