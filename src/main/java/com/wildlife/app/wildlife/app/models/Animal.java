package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.constants.tables.AnimalType;
import com.wildlife.app.wildlife.app.models.constants.tables.ExistenceStatus;
import com.wildlife.app.wildlife.app.models.constants.tables.FoodHabitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = DBColumnConstants.TBL_ANIMAL)
public class Animal implements Serializable, DBColumnConstants {
    private static final long serialVersionUID = -29489129502139129L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = COL_TBL_ANIMAL_ID, length = 40)
    private int animalId;

    @Column(name = COL_TBL_ANIMAL_NAME, length = 500, nullable = false)
    private String animalName;

    @Column(name = COL_TBL_ANIMAL_SCIENTIFIC_NAME, length = 500, nullable = false)
    private String scientificName;

    @Column(name = COL_TBL_ANIMAL_GENDER, length = 10, nullable = false)
    private String animalGender;

    @OneToOne
    @JoinColumn(name = COL_ANIMAL_TYPE_ID,
            referencedColumnName = COL_ANIMAL_TYPE_ID,
            nullable = false,
            foreignKey = @ForeignKey(name = "animal_type_mapping", value = ConstraintMode.CONSTRAINT))
    private AnimalType animalType;

    @OneToOne
    @JoinColumn(name = COL_EXISTENCE_STATUS_ID,
            referencedColumnName = COL_EXISTENCE_STATUS_ID,
            nullable = false,
            foreignKey = @ForeignKey(name = "animal_existence_mapping", value = ConstraintMode.CONSTRAINT))
    private ExistenceStatus existenceStatus;

    @OneToOne
    @JoinColumn(name = COL_FOOD_HABIT_TYPE_ID,
            referencedColumnName = COL_FOOD_HABIT_TYPE_ID,
            nullable = false,
            foreignKey = @ForeignKey(name = "animal_food_habit_mapping", value = ConstraintMode.CONSTRAINT))
    private FoodHabitType foodHabitType;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = JOIN_TBL_ANIMAL_LOCATION_MAPPING,
            joinColumns = @JoinColumn(name = JOIN_COL_LOCATION_ID),
            inverseJoinColumns = @JoinColumn(name = JOIN_COL_ANIMAL_ID),
            foreignKey = @ForeignKey(name = "location_animal_mapping", value = ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(name = "animal_location_mapping", value = ConstraintMode.CONSTRAINT))
    private List<Location> spottingLocations;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = JOIN_TBL_ANIMAL_TOUR_MAPPING,
            joinColumns = @JoinColumn(name = "tour_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id"),
            foreignKey = @ForeignKey(name = "tour_animal_mapping", value = ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(name = "animal_tour_mapping", value = ConstraintMode.CONSTRAINT))
    private List<Tour> spottedInTours;

    public int getResourceId(){
        return this.animalId;
    }

    @OneToMany(mappedBy = "animal")
    private List<ResourceImage> resourceImages;
}
