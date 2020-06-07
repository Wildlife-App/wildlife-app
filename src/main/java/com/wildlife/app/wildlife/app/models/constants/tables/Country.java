package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = DBColumnConstants.TBL_CONST_COUNTRY)
public class Country implements Serializable, DBColumnConstants {
    private static final long serialVersionUID = -585452136569454L;
    @Id
    @Column(name = COL_TBL_COUNTRY_CODE)
    private String countryCode;

    @Column(name = COL_TBL_COUNTRY_NAME)
    private String countryName;

    @Column(name = COL_TBL_COUNTRY_ISD)
    private String isdCode;
}
