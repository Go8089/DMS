package com.dmvschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dmvschool.entity.Document;
import java.util.List;
public interface DocumentRepository extends JpaRepository<Document ,Long>{

   List<Document> findByCategory(String category);
    List<Document> findByActiveTrue();
}
