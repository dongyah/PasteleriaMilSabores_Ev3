package com.example.backend.BackEnd.auth; // Ajusta el paquete

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    private String nombre;
    private String apellidos;
    private String fechaNac;
    private String rut;
    private String correo; // El campo email del login es ahora el correo
    private String telefono;
    private String region;
    private String comuna;
    private String direccion;
    private String password; // Contraseña a encriptar
    private String tipoUsuario; // Opcional, pero incluido en el payload de tu registro
    private String codigoDescuento; // <-- ¡Añadido para resolver el error!
}