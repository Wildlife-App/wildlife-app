package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = DBColumnConstants.TBL_TOUR)
@Data
@EqualsAndHashCode(of = {"tourId"})
public class Tour implements Serializable, DBColumnConstants {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = COL_TBL_TOUR_ID)
    private int tourId;

    @Column(name = COL_TBL_TOUR_START_DATE, nullable = false)
    private Date startDate;

    @Column(name = COL_TBL_TOUR_END_DATE, nullable = false)
    private Date endDate;

    @OneToOne
    @JoinColumn(name = COL_TBL_LOCATION_ID, referencedColumnName = COL_TBL_LOCATION_ID, nullable = false)
    private Location location;

    @Column(name = COL_TBL_TOUR_SAFARIS_NO)
    private int safaris;

    @Column(name = COL_TBL_CREATE_DT)
    private Date createDate;

}
