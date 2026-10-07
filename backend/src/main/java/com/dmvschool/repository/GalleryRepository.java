package com.dmvschool.repository;

import com.dmvschool.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository
        extends JpaRepository<GalleryItem, Long> {

    List<GalleryItem> findByCategory(String category);

    List<GalleryItem> findByMediaType(
            com.dmvschool.entity.MediaType mediaType
    );

    List<GalleryItem> findByHomepageSliderTrueAndActiveTrue();

    List<GalleryItem> findByActiveTrue();
}
