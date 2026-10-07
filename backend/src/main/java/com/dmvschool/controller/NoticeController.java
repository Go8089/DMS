package com.dmvschool.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmvschool.entity.Notice;
import com.dmvschool.service.NoticeService;
import java.util.List;
@RestController 
@RequestMapping ("/api/notices")
public class NoticeController {
     private final NoticeService service;

    public NoticeController(NoticeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return service.getAllNotices();
    }

    @GetMapping("/{id}")
    public Notice getNoticeById(@PathVariable Long id) {
        return service.getNoticeById(id);
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return service.createNotice(notice);
    }

    @PutMapping("/{id}")
    public Notice updateNotice(
            @PathVariable Long id,
            @RequestBody Notice notice
    ) {
        return service.updateNotice(id, notice);
    }

    @DeleteMapping("/{id}")
    public void deleteNotice(@PathVariable Long id) {
        service.deleteNotice(id);
    }
}
