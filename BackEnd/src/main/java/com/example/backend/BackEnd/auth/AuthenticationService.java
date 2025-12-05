package com.example.backend.BackEnd.auth; // Ajusta el paquete

import com.example.backend.BackEnd.jwt.JwtService;
import com.example.backend.BackEnd.model.Role;
import com.example.backend.BackEnd.model.Usuario;
import com.example.backend.BackEnd.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // Dependencias inyectadas
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager; // Del ApplicationConfig

    // -----------------------------------------------------------------
    // LÓGICA DE LOGIN
    // -----------------------------------------------------------------
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        
        // 1. Autentica las credenciales usando el AuthenticationManager
        // Esto lanzará una excepción si el usuario/contraseña es incorrecto
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getCorreo(),
                        request.getPassword()
                )
        );
        
        // 2. Si la autenticación es exitosa, carga los detalles del usuario
        UserDetails user = usuarioRepository.findByCorreo(request.getCorreo())
                .orElseThrow(); // Ya sabemos que existe, si no, habría fallado la autenticación

        // 3. Genera el token JWT
        String token = jwtService.generateToken(user);
        
        // 4. Devuelve la respuesta con el token
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    // -----------------------------------------------------------------
    // LÓGICA DE REGISTRO
    // -----------------------------------------------------------------
    public AuthenticationResponse register(RegisterRequest request) {
        
        // El DTO de registro puede ser la misma entidad Usuario
        // NOTA: Para el registro en el frontend, probablemente necesitarás un DTO separado para validar mejor.
        
        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellidos(request.getApellidos())
                .rut(request.getRut())
                .correo(request.getCorreo())
                .password(passwordEncoder.encode(request.getPassword())) // ENCRIPTAR LA CONTRASEÑA
                .telefono(request.getTelefono())
                .region(request.getRegion())
                .comuna(request.getComuna())
                .direccion(request.getDireccion())
                .fechaNac(request.getFechaNac())
                .codigoDescuento(request.getCodigoDescuento())
                // Asignar el rol por defecto (Cliente) para el registro público
                .tipoUsuario(Role.CLIENTE) 
                .build();

        usuarioRepository.save(usuario);
        
        // Generar token para que el usuario quede logueado inmediatamente después del registro
        String token = jwtService.generateToken(usuario);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}