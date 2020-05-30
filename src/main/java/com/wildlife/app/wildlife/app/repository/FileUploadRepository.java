package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface FileUploadRepository extends JpaRepository<UploadedFile, Integer> {
}
