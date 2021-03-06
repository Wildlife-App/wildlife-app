package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.constants.tables.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "menus", path = "menus", exported = false)
public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
}
