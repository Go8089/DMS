package com.dmvschool.service;

import org.springframework.stereotype.Service;

import com.dmvschool.entity.Notice;
import com.dmvschool.repository.NoticeRepository;
import java.util.List;
@Service
public class NoticeService {
     private final NoticeRepository repository;

    public NoticeService(NoticeRepository repository) {
        this.repository = repository;
    }

    public List<Notice> getAllNotices() {
        return repository.findAll();
    }

    public Notice getNoticeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));
    }

    public Notice createNotice(Notice notice) {
        return repository.save(notice);
    }

    public Notice updateNotice(Long id, Notice updatedNotice) {
        Notice notice = getNoticeById(id);

        notice.setTitle(updatedNotice.getTitle());
        notice.setDescription(updatedNotice.getDescription());
        notice.setType(updatedNotice.getType());
        notice.setNoticeDate(updatedNotice.getNoticeDate());
        notice.setDocumentUrl(updatedNotice.getDocumentUrl());

        return repository.save(notice);
    }

    public void deleteNotice(Long id) {
        repository.deleteById(id);
    }
}
