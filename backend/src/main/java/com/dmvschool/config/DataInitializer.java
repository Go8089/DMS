package com.dmvschool.config;

import com.dmvschool.entity.Admin;
import com.dmvschool.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(
            AdminRepository repository,
            PasswordEncoder passwordEncoder,
            @Value("${admin.username:}") String username,
            @Value("${admin.password:}") String password
    ) {
        return args -> {

            if (username.isBlank() || password.isBlank()) {
                return;
            }

            if (repository.findByUsername(username).isEmpty()) {

                Admin admin = new Admin();

                admin.setUsername(username);
                admin.setPassword(passwordEncoder.encode(password));
                admin.setRole("ADMIN");

                repository.save(admin);

                System.out.println("Admin account created: " + username);
            }
        };
    }
}