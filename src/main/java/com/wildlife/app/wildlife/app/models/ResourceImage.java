package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_resource_img")
public class ResourceImage implements Serializable, DBColumnConstants {
    @Id
    @Column(name = "resource_image_id", length = 50)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int resourceImageId;

    @Column(name = "resource_url", length = 200, nullable = false)
    private String resourceUrl;

    @Column(name = "resource_caption", length = 200, nullable = false)
    private String caption;

    @Column(name = "resource_type", length = 200, nullable = false)
    private String resourceType;

    @Column(name = "animal_id")
    private int animalId;

    @Column(name = "tour_id")
    private int tourId;

    public int getResourceId() {
        return this.resourceImageId;
    }
}
