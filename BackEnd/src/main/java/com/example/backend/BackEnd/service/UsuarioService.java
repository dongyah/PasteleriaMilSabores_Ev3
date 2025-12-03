package com.example.backend.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.BackEnd.model.Usuario;
import com.example.backend.BackEnd.repository.UsuarioRepository;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario saveUsuario(Usuario usuario) {
        usuario.setId(null);
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByIdUsuario(Long id) {
        return usuarioRepository.findById(id);
    }

    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
    
}
