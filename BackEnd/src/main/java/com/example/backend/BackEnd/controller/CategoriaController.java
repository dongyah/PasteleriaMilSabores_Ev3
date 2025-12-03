package com.example.backend.BackEnd.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.BackEnd.model.Categoria;
import com.example.backend.BackEnd.repository.CategoriaRepository;
import com.example.backend.BackEnd.service.CategoriaService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/Categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaService CategoriaService;
    @GetMapping("/all")
    public List<Categoria> getAllCategoria() {
        return CategoriaService.getAllCategorias();
    }
    @PostMapping("/save")
    public Categoria postCategoria(@RequestBody Categoria entity) {        
        return CategoriaService.saveCategoria(entity);
    }
    @GetMapping("/find/{id}")
    public Optional<Categoria> getCategoriaId(@PathVariable Long id) {
        return CategoriaService.findByIdCategoria(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategoria(@PathVariable Long id){
        CategoriaService.deleteCategoria(id);
    }
    
    @Autowired
    private CategoriaRepository CategoriaRepository;
    @PutMapping("/update/{id}")
    public Optional<Object> 
        putCategoria(@PathVariable Long id, @RequestBody Categoria entity) {
        
        return CategoriaRepository.findById(id)
        .map(existeCategoria->{
            existeCategoria.setNombre(entity.getNombre());

            Categoria CategoriaUpdate = CategoriaRepository.save(existeCategoria);
            return CategoriaUpdate;
        });
    }
    
}


