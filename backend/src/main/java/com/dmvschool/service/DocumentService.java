package com.dmvschool.service;

import com.dmvschool.entity.Document;
import com.dmvschool.exception.ResourceNotFoundException;
import com.dmvschool.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository repository;

    public DocumentService(DocumentRepository repository) {
        this.repository = repository;
    }

    public List<Document> getAllDocuments() {
        return repository.findAll();
    }

    public List<Document> getActiveDocuments() {
        return repository.findByActiveTrue();
    }

    public Document getDocumentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Document not found with id: " + id
                        ));
    }

    public Document createDocument(Document document) {
        return repository.save(document);
    }

    public Document updateDocument(Long id, Document updated) {
        Document document = getDocumentById(id);

        document.setTitle(updated.getTitle());
        document.setDescription(updated.getDescription());
        document.setDocumentUrl(updated.getDocumentUrl());
        document.setCategory(updated.getCategory());
        document.setActive(updated.getActive());

        return repository.save(document);
    }

    public void deleteDocument(Long id) {
        Document document = getDocumentById(id);
        repository.delete(document);
    }
}