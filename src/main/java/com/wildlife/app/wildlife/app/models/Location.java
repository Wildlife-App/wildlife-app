package com.wildlife.app.wildlife.app.models;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.constants.tables.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = DBColumnConstants.TBL_LOCATION)
public class Location implements Serializable, DBColumnConstants, Comparable<Location> {
    private static final long serialVersionUID = -5463229502452123L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = COL_TBL_LOCATION_ID, length = 40)
    private int locationId;

    @Column(name = COL_TBL_LOCATION_NAME, length = 40, nullable = false, unique = true)
    private String locationName;

    @OneToOne
    @JoinColumn(name = COL_TBL_STATE_CODE,
            referencedColumnName = COL_TBL_STATE_CODE,
            nullable = false,
            foreignKey = @ForeignKey(name = "location_state_mapping", value = ConstraintMode.CONSTRAINT))
    private State state;

    @Column(name = COL_TBL_LOCATION_AREA, length = 8, nullable = false)
    private Double area;

    @Column(name = COL_TBL_CREATE_DT)
    private Date createDate;

    public int getResourceId(){
        return this.locationId;
    }

    @Override
    public int compareTo(Location o) {
        return this.locationName.compareTo(o.locationName);
    }
}
