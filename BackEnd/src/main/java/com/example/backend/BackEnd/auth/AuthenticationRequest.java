package com.example.backend.BackEnd.auth; // Ajusta el paquete

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    
    // NOTA: En tu entidad Usuario usamos 'correo' como nombre de usuario. 
    // Usamos 'email' o 'correo' aquí para reflejar el uso en el BE.
    private String correo; 
    private String password;
}