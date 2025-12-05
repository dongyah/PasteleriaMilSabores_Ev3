package com.example.backend.BackEnd.config; // Asegúrate de usar el paquete correcto

import com.example.backend.BackEnd.jwt.JwtAuthenticationFilter; // Clase que crearemos después (necesaria para inyectar)
import com.example.backend.BackEnd.model.Role; // Importa tu Enum Role
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // Usado para inyectar el filtro y el proveedor
public class SecurityConfiguration {

    // Se inyectan las clases esenciales de la seguridad
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider; 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Deshabilitar CSRF (importante para API REST sin sesiones)
            .csrf(csrf -> csrf.disable())
            
            // 2. Definir las reglas de Autorización
            .authorizeHttpRequests(auth -> 
                auth
                    // Rutas Públicas: Permite acceso al LOGIN, SWAGGER y V3 Docs
                    .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                    
                    // Rutas Protegidas por Rol (Gestión de Usuarios)
                    .requestMatchers("/api/usuarios/**").hasAuthority(Role.ADMINISTRADOR.name()) 
                    
                    // Rutas Protegidas por Rol (Gestión de Productos)
                    .requestMatchers("/api/productos/**").hasAnyAuthority(Role.ADMINISTRADOR.name(), Role.VENDEDOR.name()) 
                    
                    // Cualquier otra petición REQUIERE AUTENTICACIÓN
                    .anyRequest().authenticated()
            )
            
            // 3. Gestión de Sesiones: Configurar como SIN ESTADO (STATELESS) para JWT
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 4. Usar nuestro proveedor de autenticación (definido en ApplicationConfig)
            .authenticationProvider(authProvider) 
            
            // 5. Añadir nuestro filtro JWT antes del filtro de autenticación de Spring
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); 

        return http.build();
    }
    
    // NOTA: El PasswordEncoder y UserDetailsService ya están definidos en ApplicationConfig.java,
    // siguiendo la estructura del tutorial.
}