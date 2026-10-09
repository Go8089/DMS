package com.dmvschool.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            // IMPORTANT: allow browser CORS preflight
            .cors(cors -> {})

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Authentication
                .requestMatchers("/api/auth/**").permitAll()

                // Public APIs
                .requestMatchers(
                    "/api/school",
                    "/api/school/**",
                    "/api/notices",
                    "/api/notices/**",
                    "/api/events",
                    "/api/events/**",
                    "/api/achievements",
                    "/api/achievements/**",
                    "/api/faculty",
                    "/api/faculty/**",
                    "/api/facilities",
                    "/api/facilities/**",
                    "/api/gallery",
                    "/api/gallery/**",
                    "/api/academics",
                    "/api/academics/**",
                    "/api/admissions",
                    "/api/admissions/**"
                ).permitAll()

                // Public enquiry submission
                .requestMatchers(
                    "/api/admissions/enquiries",
                    "/api/contact/enquiries"
                ).permitAll()

                // Admin APIs
                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

                .anyRequest()
                .authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}