package com.dmvschool.controller.admin;

import com.dmvschool.entity.Notice;
import com.dmvschool.service.NoticeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/notices")
public class AdminNoticeController {

    private final NoticeService service;

    public AdminNoticeController(NoticeService service) {
        this.service = service;
    }

    @PostMapping
    public Notice createNotice(
            @RequestBody Notice notice
    ) {
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
    public void deleteNotice(
            @PathVariable Long id
    ) {
        service.deleteNotice(id);
    }
}