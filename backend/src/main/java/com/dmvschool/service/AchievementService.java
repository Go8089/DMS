package com.dmvschool.service;

import com.dmvschool.entity.Achievement;
import com.dmvschool.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {

    private final AchievementRepository repository;

    public AchievementService(AchievementRepository repository) {
        this.repository = repository;
    }

    public List<Achievement> getAllAchievements() {
        return repository.findAll();
    }

    public Achievement getAchievementById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
    }

    public Achievement createAchievement(Achievement achievement) {
        return repository.save(achievement);
    }

    public Achievement updateAchievement(
            Long id,
            Achievement updatedAchievement
    ) {
        Achievement achievement = getAchievementById(id);

        achievement.setTitle(updatedAchievement.getTitle());
        achievement.setDescription(updatedAchievement.getDescription());
        achievement.setCategory(updatedAchievement.getCategory());
        achievement.setAchievementDate(
                updatedAchievement.getAchievementDate()
        );
        achievement.setImageUrl(updatedAchievement.getImageUrl());

        return repository.save(achievement);
    }

    public void deleteAchievement(Long id) {
        repository.deleteById(id);
    }
}