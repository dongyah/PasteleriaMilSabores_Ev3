package com.example.backend.BackEnd.config; // Ajusta el paquete

import com.example.backend.BackEnd.repository.UsuarioRepository; // Importa tu Repositorio
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// NOTA: Si usaste UserDetailsServiceImpl en tu proyecto en lugar de UserDetailsServiceImp, 
// ajusta el nombre. Usaré UserDetailsServiceImpl como es más común.

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository; // Inyecta tu Repositorio

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        // Lógica de búsqueda del usuario por correo (que es el 'username' en tu caso)
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + correo));
    }
}