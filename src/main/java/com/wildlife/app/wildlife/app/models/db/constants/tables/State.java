package com.wildlife.app.wildlife.app.models.db.constants.tables;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wildlife.app.wildlife.app.models.db.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.db.constants.ConstantData;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@EqualsAndHashCode(exclude = {"countryCode"})
@Entity(name = DBColumnConstants.TBL_CONST_STATE)
public class State implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_STATE_CODE)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String stateCode;

    @Column(name = COL_TBL_STATE_NAME, nullable = false, length = 100)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String stateName;

    @Column(name = COL_TBL_COUNTRY_CODE, nullable = false, length = 100)
    private String countryCode;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(stateCode) || StringUtils.isEmpty(stateName);
    }
}
