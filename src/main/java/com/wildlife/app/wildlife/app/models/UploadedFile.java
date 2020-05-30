package com.wildlife.app.wildlife.app.models;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Builder
@Table(name = "uploaded_file")
public class UploadedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int fileId;

    @Column(name = "file_name", nullable = false, length = 500, updatable = false)
    private String fileName;

    @Column(name = "full_url", nullable = false, length = 500, updatable = false)
    private String fullUrl;

    public static UploadedFile buildWithId(int id) {
        return UploadedFile.builder().fileId(id).build();
    }
}
