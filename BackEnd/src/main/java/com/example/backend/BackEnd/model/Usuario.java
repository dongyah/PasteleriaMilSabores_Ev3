package com.example.backend.BackEnd.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String apellidos;
    private LocalDate fechaNac;
    private String rut;
    private String correo;
    private String telefono;
    private String region;
    private String comuna;
    private String direccion;
    private String password;
    private String tipoUsuario;
    private String codigoDescuento;

    
}
