package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.ResourceImage;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "images", path = "images")
public interface ResourceImageRepository extends JpaRepository<ResourceImage, Integer> {
    List<ResourceImage> findAllByAnimalId(int animalId);

    List<ResourceImage> findAllByTourId(int animalId);

    @RestResource(path = "tourImages")
    List<ResourceImage> findAllByAnimalIdAndTourId(int animalId, int tourId);

    @Override
    @RestResource(exported = false)
    List<ResourceImage> findAll();

    @Override
    @RestResource(exported = false)
    List<ResourceImage> findAll(Sort sort);
}

