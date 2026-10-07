package com.dmvschool.repository;

import com.dmvschool.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    List<Faculty> findByDepartment(String department);

    List<Faculty> findByPrincipal(Boolean principal);
}