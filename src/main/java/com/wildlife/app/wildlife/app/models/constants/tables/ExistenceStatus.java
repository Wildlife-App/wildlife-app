package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.ConstantData;
import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = DBColumnConstants.TBL_CONST_EXISTENCE_STATUS)
public class ExistenceStatus implements Serializable, DBColumnConstants, ConstantData {
    private static final long serialVersionUID = -923981298898959283L;
    @Id
    @Column(name = COL_EXISTENCE_STATUS_ID, length = 30)
    private String existenceStatusId;
    @Column(name = COL_EXISTENCE_STATUS, length = 300, nullable = false)
    private String existenceStatus;
    @Column(name = COL_EXISTENCE_STATUS_DESCRIPTION, length = 3000, nullable = false)
    private String existenceStatusDescription;

    @Override
    public boolean isEmpty() {
        return StringUtils.isEmpty(existenceStatusId) || StringUtils.isEmpty(existenceStatus);
    }
}
