package com.example.backend.BackEnd.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.BackEnd.model.Usuario;
import com.example.backend.BackEnd.repository.UsuarioRepository;
import com.example.backend.BackEnd.service.UsuarioService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    
    @Autowired
    private UsuarioService UsuarioService;
    @GetMapping("/all")
    public List<Usuario> getAllUsuario() {
        return UsuarioService.getAllUsuarios();
    }
    @PostMapping("/save")
    public Usuario postUsuario(@RequestBody Usuario entity) {        
        return UsuarioService.saveUsuario(entity);
    }
    @GetMapping("/find/{id}")
    public Optional<Usuario> getUsuarioId(@PathVariable Long id) {
        return UsuarioService.findByIdUsuario(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUsuario(@PathVariable Long id){
        UsuarioService.deleteUsuario(id);
    }
    
    @Autowired
    private UsuarioRepository UsuarioRepository;
    @PutMapping("/update/{id}")
    public Optional<Object> 
        putUsuario(@PathVariable Long id, @RequestBody Usuario entity) {
        
        return UsuarioRepository.findById(id)
        .map(existeUsuario->{
            existeUsuario.setNombre(entity.getNombre());
            existeUsuario.setApellidos(entity.getApellidos());
            existeUsuario.setFechaNac(entity.getFechaNac());
            existeUsuario.setRut(entity.getRut());
            existeUsuario.setCorreo(entity.getCorreo());
            existeUsuario.setTelefono(entity.getTelefono());
            existeUsuario.setRegion(entity.getRegion());
            existeUsuario.setComuna(entity.getComuna());
            existeUsuario.setDireccion(entity.getDireccion());
            existeUsuario.setPassword(entity.getPassword());
            existeUsuario.setTipoUsuario(entity.getTipoUsuario());
            existeUsuario.setCodigoDescuento(entity.getCodigoDescuento());

            Usuario UsuarioUpdate = UsuarioRepository.save(existeUsuario);
            return UsuarioUpdate;
        });
    }
    
}


