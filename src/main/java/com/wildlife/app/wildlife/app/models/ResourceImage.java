package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "tbl_resource_img")
public class ResourceImage implements Serializable, DBColumnConstants {
    @Id
    @Column(name = "resource_image_id", length = 50)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int resourceImageId;

    @Column(name = "resource_url", length = 200, nullable = false)
    private String resourceUrl;

    @Column(name = "resource_type", length = 200, nullable = false)
    private String resourceType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "animal_resource_id", referencedColumnName = COL_TBL_ANIMAL_ID,
            foreignKey = @ForeignKey(name = "animal_image_mapping", value = ConstraintMode.CONSTRAINT))
    private Animal animal;

    @Column(name = "tour_id")
    private int tourId;


}
