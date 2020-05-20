package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.Tour;
import com.wildlife.app.wildlife.app.models.projections.TourProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "tours",
        path = "tours",
        excerptProjection = TourProjection.class
)
public interface TourRepository extends JpaRepository<Tour, Integer> {
}
