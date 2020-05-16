package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.Location;
import com.wildlife.app.wildlife.app.models.projections.LocationExcerpt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Optional;

@RepositoryRestResource(
        collectionResourceRel = "locations",
        path = "locations",
        excerptProjection = LocationExcerpt.class)
public interface LocationRepository extends JpaRepository<Location, Integer> {
    @RestResource(path = "byName")
    Optional<Location> findByLocationName(String locationName);
}
