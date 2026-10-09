package com.dmvschool.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor 
public class AdmissionInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String procedure;

    @Column(length = 2000)
    private String eligibility;

    @Column(length = 2000)
    private String requiredDocuments;

    private String admissionDates;

    private String feeDetails;

    private String applicationFormUrl;

    private String brochureUrl;

    private Boolean active;
}