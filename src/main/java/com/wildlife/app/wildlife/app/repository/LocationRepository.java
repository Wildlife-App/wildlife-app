package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.Location;
import com.wildlife.app.wildlife.app.models.projections.LocationProjection;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Optional;

@RepositoryRestResource(
        collectionResourceRel = "locations",
        path = "locations",
        excerptProjection = LocationProjection.class)
public interface LocationRepository extends PagingAndSortingRepository<Location, Integer> {
    @RestResource(path = "byName")
    Optional<LocationProjection> findByLocationName(String locationName);
}
