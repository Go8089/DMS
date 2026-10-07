package com.dmvschool.service;

import com.dmvschool.entity.Event;
import com.dmvschool.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    public Event getEventById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(Event event) {
        return repository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = getEventById(id);

        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setEventDate(updatedEvent.getEventDate());
        event.setLocation(updatedEvent.getLocation());
        event.setImageUrl(updatedEvent.getImageUrl());

        return repository.save(event);
    }

    public void deleteEvent(Long id) {
        repository.deleteById(id);
    }
}