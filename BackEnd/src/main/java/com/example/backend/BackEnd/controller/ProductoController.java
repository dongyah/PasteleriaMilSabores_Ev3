package com.example.backend.BackEnd.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.BackEnd.model.Producto;
import com.example.backend.BackEnd.repository.ProductoRepository;
import com.example.backend.BackEnd.service.ProductoService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    @GetMapping("/all")
    public List<Producto> getAllProducto() {
        return productoService.getAllProductos();
    }
    @PostMapping("/save")
    public Producto postProducto(@RequestBody Producto entity) {        
        return productoService.saveProducto(entity);
    }
    @GetMapping("/find/{id}")
    public Optional<Producto> getProductoId(@PathVariable Long id) {
        return productoService.findByIdProducto(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Long id){
        productoService.deleteProducto(id);
    }
    
    @Autowired
    private ProductoRepository productoRepository;
    @PutMapping("/update/{id}")
    public Optional<Object> 
        putProducto(@PathVariable Long id, @RequestBody Producto entity) {
        
        return productoRepository.findById(id)
        .map(existeProducto->{
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


