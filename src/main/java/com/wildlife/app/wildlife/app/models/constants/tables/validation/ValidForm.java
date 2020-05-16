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
@Entity(name = "validation_tbl_valid_form")
public class ValidForm {
    @Id
    @Column(name = "form_name")
    private String formName;

    public String getDeclaredFormName() {
        return this.formName;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fkey_form_name", referencedColumnName = "form_name",
            foreignKey = @ForeignKey(name = "form_field_constraint", value = ConstraintMode.CONSTRAINT))
    private List<FormField> formFields;
}
