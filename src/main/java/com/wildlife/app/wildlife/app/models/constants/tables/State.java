package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = DBColumnConstants.TBL_CONST_STATE)
public class State implements Serializable, DBColumnConstants {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_STATE_CODE)
    private String stateCode;

    @Column(name = COL_TBL_STATE_NAME, nullable = false, length = 100)
    private String stateName;

    @ManyToOne
    @JoinColumn(name = COL_TBL_COUNTRY_CODE,
            referencedColumnName = COL_TBL_COUNTRY_CODE,
            nullable = false,
            foreignKey = @ForeignKey(name = "state_country_mapping", value = ConstraintMode.CONSTRAINT))
    private Country country;

}
