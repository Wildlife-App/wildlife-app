package com.wildlife.app.wildlife.app.models.db.constants.tables;

import com.wildlife.app.wildlife.app.models.db.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.db.constants.ConstantData;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Entity(name = DBColumnConstants.TBL_CONST_FOOD_HABIT_TYPE)
public class FoodHabitType implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -29489129502139129L;
    @Id
    @Column(name = COL_FOOD_HABIT_TYPE_ID, length = 30)
    private String foodHabitTypeId;
    @Column(name = COL_FOOD_HABIT_TYPE, length = 300)
    private String foodHabitType;
    @Column(name = COL_FOOD_HABIT_TYPE_DEFINITION, length = 3000)
    private String foodHabitTypeDefinition;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(foodHabitType) || StringUtils.isEmpty(foodHabitTypeId);
    }
}
