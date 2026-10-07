package com.dmvschool.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdmissionEnquiryRequest {

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Parent name is required")
    private String parentName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Class is required")
    private String classApplyingFor;

    private String message;
}