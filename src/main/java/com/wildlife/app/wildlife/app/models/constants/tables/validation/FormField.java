package com.wildlife.app.wildlife.app.models.constants.tables.validation;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity(name = "validation_tbl_form_fields")
public class FormField {
    @Id
    @Column(name = "form_field_id", length = 100)
    private String formFieldId;

    @Column(name = "form_field_name", length = 20, nullable = false)
    private String formFieldName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fkey_form_field_id", referencedColumnName = "form_field_id",
            foreignKey = @ForeignKey(name = "form_validation_message_constraint", value = ConstraintMode.CONSTRAINT))
    private List<ValidationMessage> validationMessages;

}
