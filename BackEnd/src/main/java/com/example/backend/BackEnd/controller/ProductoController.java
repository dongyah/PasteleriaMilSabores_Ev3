package com.example.backend.BackEnd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.BackEnd.model.Producto;
import com.example.backend.BackEnd.service.ProductoService;
import com.example.backend.BackEnd.repository.ProductoRepository;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/all")
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @PostMapping("/save")
    public Producto postProducto(@RequestBody Producto entity) {
        return productoService.saveProducto(entity);
    }

    @GetMapping("/find/{id}")
    public Optional<Producto> getPersonaId(@PathVariable Long id) {
        return productoService.findByIdProducto(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Long id){
        productoService.deleteProducto(id);
    }

    @PutMapping("/update/{id}")
    public Optional<Producto> 
            putProducto(@PathVariable Long id, @RequestBody Producto entity) {
        
        return productoRepository.findById(id)
        .map(existeProducto -> {
            existeProducto.setCodigo(entity.getCodigo());
            existeProducto.setNombre(entity.getNombre());
            existeProducto.setDescripcion(entity.getDescripcion());
            existeProducto.setPrecio(entity.getPrecio());
            existeProducto.setStock(entity.getStock());
            existeProducto.setStockCritico(entity.getStockCritico());
            existeProducto.setCategoria(entity.getCategoria());
            existeProducto.setImagen(entity.getImagen());
            Producto productoUpdate = productoRepository.save(existeProducto);
            return productoUpdate;
        });
    }
    

    
    
    
}
