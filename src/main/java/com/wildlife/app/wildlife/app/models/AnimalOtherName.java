package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = DBColumnConstants.TBL_ANIMAL_OTHER_NAME)
public class AnimalOtherName implements Serializable, DBColumnConstants {
    @Id
    @Column(name = COL_TBL_ANIMAL_OTHER_NAME_ID, length = 40)
    private String animalOtherNameId;
    @Column(name = COL_TBL_ANIMAL_OTHER_NAME, length = 500)
    private String animalOtherName;
    @Column(name = COL_TBL_ANIMAL_ID, length = 40)
    private String animalId;
}
