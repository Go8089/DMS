package com.dmvschool.service;

import com.dmvschool.entity.GalleryItem;
import com.dmvschool.entity.MediaType;
import com.dmvschool.repository.GalleryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    private final GalleryRepository repository;

    public GalleryService(GalleryRepository repository) {
        this.repository = repository;
    }

    public List<GalleryItem> getAllGalleryItems() {
        return repository.findAll();
    }

    public List<GalleryItem> getActiveGalleryItems() {
        return repository.findByActiveTrue();
    }

    public GalleryItem getGalleryItemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Gallery item not found"));
    }

    public List<GalleryItem> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<GalleryItem> getByMediaType(MediaType mediaType) {
        return repository.findByMediaType(mediaType);
    }

    public List<GalleryItem> getHomepageSlider() {
        return repository.findByHomepageSliderTrueAndActiveTrue();
    }

    public GalleryItem createGalleryItem(GalleryItem item) {
        return repository.save(item);
    }

    public GalleryItem updateGalleryItem(
            Long id,
            GalleryItem updatedItem
    ) {
        GalleryItem item = getGalleryItemById(id);

        item.setTitle(updatedItem.getTitle());
        item.setDescription(updatedItem.getDescription());
        item.setMediaUrl(updatedItem.getMediaUrl());
        item.setMediaType(updatedItem.getMediaType());
        item.setCategory(updatedItem.getCategory());
        item.setHomepageSlider(updatedItem.getHomepageSlider());
        item.setActive(updatedItem.getActive());

        return repository.save(item);
    }

    public void deleteGalleryItem(Long id) {
        repository.deleteById(id);
    }
}