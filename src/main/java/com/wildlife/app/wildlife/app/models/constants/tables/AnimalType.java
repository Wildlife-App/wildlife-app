package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.constants.ConstantData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = DBColumnConstants.TBL_CONST_ANIMAL_TYPE)
public class AnimalType implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_ANIMAL_TYPE_ID, length = 30)
    private String animalTypeId;
    @Column(name = COL_ANIMAL_TYPE_NAME, length = 3000, nullable = false)
    private String animalTypeName;
    @Column(name = COL_ANIMAL_TYPE_DEFINITION, length = 3000, nullable = false)
    private String animalTypeDefinition;

    public String getResourceId() {
        return this.animalTypeId;
    }

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(animalTypeId) || StringUtils.isEmpty(animalTypeName);
    }
}
