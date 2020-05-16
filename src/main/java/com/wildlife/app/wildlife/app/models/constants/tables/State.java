package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.ConstantData;
import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Entity(name = DBColumnConstants.TBL_CONST_STATE)
public class State implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_STATE_CODE)
    private String stateCode;

    @Column(name = COL_TBL_STATE_NAME, nullable = false, length = 100)
    private String stateName;

    @ManyToOne
    private Country country;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(stateCode) || StringUtils.isEmpty(stateName);
    }
}
