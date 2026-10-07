package com.dmvschool.controller.admin;

import com.dmvschool.entity.GalleryItem;
import com.dmvschool.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/gallery")
public class AdminGalleryController {

    private final GalleryService service;

    public AdminGalleryController(GalleryService service) {
        this.service = service;
    }

    @GetMapping
    public List<GalleryItem> getAllGalleryItems() {
        return service.getAllGalleryItems();
    }

    @GetMapping("/{id}")
    public GalleryItem getGalleryItemById(@PathVariable Long id) {
        return service.getGalleryItemById(id);
    }

    @PostMapping
    public GalleryItem createGalleryItem(
            @RequestBody GalleryItem galleryItem
    ) {
        return service.createGalleryItem(galleryItem);
    }

    @PutMapping("/{id}")
    public GalleryItem updateGalleryItem(
            @PathVariable Long id,
            @RequestBody GalleryItem galleryItem
    ) {
        return service.updateGalleryItem(id, galleryItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryItem(
            @PathVariable Long id
    ) {
        service.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }
}