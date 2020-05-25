package com.wildlife.app.wildlife.app.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "tbl_resource_img")
public class ResourceImage implements Serializable {
    @Id
    @Column(name = "resource_image_id", length = 50)
    private int resourceImageId;

    @Column(name = "resource_url", length = 200, nullable = false)
    private String resourceUrl;

    @Column(name = "resource_type", length = 200, nullable = false)
    private String resourceType;

    @Column(name = "related_resource_id", nullable = false)
    private int relatedResourceId;
}
