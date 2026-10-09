package com.dmvschool.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor 
public class AcademicInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String section;

    @Column(length = 2000)
    private String description;

    private String classesOffered;

    private String subjects;

    private String curriculum;

    private String academicCalendar;

    private String examinationSystem;

    @Column(length = 2000)
    private String rules;
}