package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.AnimalOtherName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "animalOtherNames", path = "animalOtherNames", exported = false)
public interface AnimalOtherNameRepository extends JpaRepository<AnimalOtherName, String> {
}
