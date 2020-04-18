package com.wildlife.app.wildlife.app.models.db;

import com.wildlife.app.wildlife.app.models.db.constants.DBColumnConstants;
import com.wildlife.app.wildlife.app.models.db.constants.tables.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = DBColumnConstants.TBL_LOCATION)
public class Location implements Serializable, DBColumnConstants {
    private static final long serialVersionUID = -5463229502452123L;
    @Id
    @Column(name = COL_TBL_LOCATION_ID, length = 40)
    private String locationId;

    @Column(name = COL_TBL_LOCATION_NAME, length = 40, nullable = false)
    private String locationName;

    @OneToOne
    @JoinColumn(name = COL_TBL_STATE_CODE, referencedColumnName = COL_TBL_STATE_CODE, nullable = false)
    private State state;

    @Column(name = COL_TBL_LOCATION_AREA, length = 8, nullable = false)
    private Double area;
}
