package com.dmvschool.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor 
public class AdmissionEnquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String parentName;

    private String phone;

    private String email;

    private String classApplyingFor;

    @Column(length = 2000)
    private String message;

    private LocalDateTime submittedAt;
}