package com.wildlife.app.wildlife.app.models.db.constants.tables;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wildlife.app.wildlife.app.models.db.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.db.constants.ConstantData;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(exclude = {"isdCode", "states"})
@Entity(name = DBColumnConstants.TBL_CONST_COUNTRY)
public class Country implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_COUNTRY_CODE)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String countryCode;

    @Column(name = COL_TBL_COUNTRY_NAME)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String countryName;

    @Column(name = COL_TBL_COUNTRY_ISD)
    private String isdCode;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = COL_TBL_COUNTRY_CODE, referencedColumnName = COL_TBL_COUNTRY_CODE)
    private List<State> states;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(countryCode) || StringUtils.isEmpty(countryName);
    }

}
