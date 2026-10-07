package com.dmvschool.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor 
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String designation;

    private String department;

    private String qualification;

    @Column(length = 1000)
    private String description;

    private String email;

    private String phone;

    private String imageUrl;

    private Boolean principal;
}
