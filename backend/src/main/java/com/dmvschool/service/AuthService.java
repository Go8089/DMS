package com.dmvschool.service;

import com.dmvschool.dto.LoginRequest;
import com.dmvschool.dto.LoginResponse;
import com.dmvschool.entity.Admin;
import com.dmvschool.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AdminRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        Admin admin = repository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(
                admin.getUsername()
        );

        return new LoginResponse(token);
    }
}