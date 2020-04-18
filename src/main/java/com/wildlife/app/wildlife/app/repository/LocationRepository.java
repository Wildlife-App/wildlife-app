package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.db.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, String> {

    Optional<Location> findByLocationName(String locationName);
}
