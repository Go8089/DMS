package com.dmvschool.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmvschool.entity.Achievement;
import com.dmvschool.service.AchievementService;

@RestController 
@RequestMapping ("/api/achievements")
public class AchievementController {
    private final AchievementService service;

    public AchievementController(AchievementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return service.getAllAchievements();
    }

    @GetMapping("/{id}")
    public Achievement getAchievementById(@PathVariable Long id) {
        return service.getAchievementById(id);
    }

    @PostMapping
    public Achievement createAchievement(
            @RequestBody Achievement achievement
    ) {
        return service.createAchievement(achievement);
    }

    @PutMapping("/{id}")
    public Achievement updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement achievement
    ) {
        return service.updateAchievement(id, achievement);
    }

    @DeleteMapping("/{id}")
    public void deleteAchievement(@PathVariable Long id) {
        service.deleteAchievement(id);
    }
}
