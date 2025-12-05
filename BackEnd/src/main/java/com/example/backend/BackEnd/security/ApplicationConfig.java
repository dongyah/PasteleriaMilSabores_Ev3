package com.example.backend.BackEnd.security; // Ajusta este paquete

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService; // Importa la interfaz
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor // Inyecta las dependencias a través del constructor
public class ApplicationConfig {

    // Inyecta la implementación de la interfaz UserDetailsService (UserDetailsServiceImpl)
    private final UserDetailsService userDetailsService; 

    // -----------------------------------------------------------------
    // 1. Bean: AuthenticationManager
    // -----------------------------------------------------------------
    // Gestiona todo el proceso de autenticación.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // -----------------------------------------------------------------
    // 2. Bean: AuthenticationProvider
    // -----------------------------------------------------------------
    // Define cómo se obtienen los detalles del usuario y cómo se verifica la contraseña.
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        
        // Asigna el servicio de búsqueda de usuario que creaste (UserDetailsServiceImpl)
        authenticationProvider.setUserDetailsService(userDetailsService); 
        
        // Asigna el codificador de contraseñas
        authenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return authenticationProvider;
    }

    // -----------------------------------------------------------------
    // 3. Bean: PasswordEncoder
    // -----------------------------------------------------------------
    // Bean para encriptar y verificar contraseñas.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}