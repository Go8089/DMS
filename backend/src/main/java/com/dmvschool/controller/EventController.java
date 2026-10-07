package com.dmvschool.controller;

import com.dmvschool.entity.Event;
import com.dmvschool.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
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
    public void deleteEvent(@PathVariable Long id) {
        service.deleteEvent(id);
    }
}