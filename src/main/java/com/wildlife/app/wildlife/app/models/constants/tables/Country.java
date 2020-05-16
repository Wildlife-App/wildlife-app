package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.ConstantData;
import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Data
@Entity(name = DBColumnConstants.TBL_CONST_COUNTRY)
public class Country implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_COUNTRY_CODE)
    private String countryCode;

    @Column(name = COL_TBL_COUNTRY_NAME)
    private String countryName;

    @Column(name = COL_TBL_COUNTRY_ISD)
    private String isdCode;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "country")
    private List<State> states;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(countryCode) || StringUtils.isEmpty(countryName);
    }

}
