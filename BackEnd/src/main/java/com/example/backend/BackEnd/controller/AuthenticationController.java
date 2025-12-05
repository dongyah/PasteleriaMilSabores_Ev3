package com.example.backend.BackEnd.controller; // Ajusta este paquete

import com.example.backend.BackEnd.auth.AuthenticationRequest;
import com.example.backend.BackEnd.auth.AuthenticationResponse;
import com.example.backend.BackEnd.auth.RegisterRequest;
import com.example.backend.BackEnd.auth.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth") // Ruta base de la autenticación
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    // -----------------------------------------------------------------
    // Endpoint para Registrar Nuevo Usuario (REGISTER)
    // -----------------------------------------------------------------
    @PostMapping(value = "register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        // Llama al servicio de registro, que encripta la contraseña y devuelve el token
        return ResponseEntity.ok(service.register(request));
    }

    // -----------------------------------------------------------------
    // Endpoint para Iniciar Sesión (AUTHENTICATE)
    // -----------------------------------------------------------------
    @PostMapping(value = "authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        // Llama al servicio de autenticación, que valida credenciales y devuelve el token
        return ResponseEntity.ok(service.authenticate(request));
    }
}