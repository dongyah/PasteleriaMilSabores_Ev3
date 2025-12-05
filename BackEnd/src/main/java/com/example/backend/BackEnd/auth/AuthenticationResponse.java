package com.example.backend.BackEnd.auth; // Ajusta el paquete

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    
    private String token;
    // Opcional: Puedes añadir el rol o el nombre aquí si lo requiere el frontend.
    // private String role; 
}