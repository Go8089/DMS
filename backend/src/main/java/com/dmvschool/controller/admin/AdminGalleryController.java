package com.dmvschool.controller.admin;

import com.dmvschool.entity.GalleryItem;
import com.dmvschool.service.GalleryService;
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
    public GalleryItem getGalleryItemById(
            @PathVariable Long id
    ) {
        return service.getGalleryItemById(id);
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