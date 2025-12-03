package com.example.backend.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.BackEnd.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
