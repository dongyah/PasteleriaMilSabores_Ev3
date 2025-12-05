package com.example.backend.BackEnd.model; // Ajusta el paquete

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="usuario") 
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String fechaNac;
    
    @Column(unique = true, nullable = false)
    private String rut; 
    
    @Column(unique = true, nullable = false)
    private String correo;
    
    private String telefono;
    private String region;
    private String comuna;
    private String direccion;
    
    @Column(nullable = false)
    private String password;
    
    private String codigoDescuento;

    @Enumerated(EnumType.STRING)
    private Role tipoUsuario; 

    // Implementación de UserDetails (Funciones de Spring Security)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelve la lista de roles del usuario como SimpleGrantedAuthority
        return List.of(new SimpleGrantedAuthority(tipoUsuario.name()));
    }

    @Override
    public String getUsername() {
        return correo; 
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}