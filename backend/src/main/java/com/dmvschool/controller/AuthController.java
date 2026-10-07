package com.dmvschool.controller;

import com.dmvschool.dto.LoginRequest;
import com.dmvschool.dto.LoginResponse;
import com.dmvschool.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request
    ) {
        return service.login(request);
    }
}