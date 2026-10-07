package com.dmvschool.controller.admin;

import com.dmvschool.entity.Event;
import com.dmvschool.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {

    private final EventService service;

    public AdminEventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return service.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return service.getEventById(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return service.createEvent(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(
            @PathVariable Long id,
            @RequestBody Event event
    ) {
        return service.updateEvent(id, event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        service.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}