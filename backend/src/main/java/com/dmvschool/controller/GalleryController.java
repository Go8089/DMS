package com.dmvschool.controller;

import com.dmvschool.entity.GalleryItem;
import com.dmvschool.entity.MediaType;
import com.dmvschool.service.GalleryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService service;

    public GalleryController(GalleryService service) {
        this.service = service;
    }

    @GetMapping
    public List<GalleryItem> getAllGalleryItems() {
        return service.getActiveGalleryItems();
    }

    @GetMapping("/{id}")
    public GalleryItem getGalleryItemById(
            @PathVariable Long id
    ) {
        return service.getGalleryItemById(id);
    }

    @GetMapping("/category/{category}")
    public List<GalleryItem> getByCategory(
            @PathVariable String category
    ) {
        return service.getByCategory(category);
    }

    @GetMapping("/type/{mediaType}")
    public List<GalleryItem> getByMediaType(
            @PathVariable MediaType mediaType
    ) {
        return service.getByMediaType(mediaType);
    }

    @GetMapping("/slider")
    public List<GalleryItem> getHomepageSlider() {
        return service.getHomepageSlider();
    }

    @PostMapping
    public GalleryItem createGalleryItem(
            @RequestBody GalleryItem item
    ) {
        return service.createGalleryItem(item);
    }

    @PutMapping("/{id}")
    public GalleryItem updateGalleryItem(
            @PathVariable Long id,
            @RequestBody GalleryItem item
    ) {
        return service.updateGalleryItem(id, item);
    }

    @DeleteMapping("/{id}")
    public void deleteGalleryItem(
            @PathVariable Long id
    ) {
        service.deleteGalleryItem(id);
    }
}