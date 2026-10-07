package com.dmvschool.config;

import com.dmvschool.repository.AdminRepository;
import com.dmvschool.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final SecurityExceptionHandler securityExceptionHandler;

public SecurityConfig(SecurityExceptionHandler securityExceptionHandler) {
    this.securityExceptionHandler = securityExceptionHandler;
}
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            JwtService jwtService,
            AdminRepository adminRepository
    ) {
        return new JwtAuthenticationFilter(jwtService, adminRepository);
    }

    @Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        JwtAuthenticationFilter jwtAuthenticationFilter
) throws Exception {

    http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    ))

            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(securityExceptionHandler)
                    .accessDeniedHandler(securityExceptionHandler)
            )

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            "/api/auth/**",
                            "/api/admissions/enquiries",
                            "/api/contact/enquiries"
                    ).permitAll()

                    .requestMatchers(
                            HttpMethod.GET,
                            "/api/school",
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
                            "/api/gallery/**"
                    ).permitAll()

                    .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")

                    .anyRequest()
                    .authenticated()
            )

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

    return http.build();
}
}