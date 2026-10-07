package com.dmvschool.controller.admin;

import com.dmvschool.entity.Achievement;
import com.dmvschool.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/achievements")
public class AdminAchievementController {

    private final AchievementService service;

    public AdminAchievementController(AchievementService service) {
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
    public ResponseEntity<Void> deleteAchievement(
            @PathVariable Long id
    ) {
        service.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }
}