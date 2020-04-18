package com.wildlife.app.wildlife.app.loader.repository;

import com.wildlife.app.wildlife.app.models.db.constants.tables.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, String> {
}
