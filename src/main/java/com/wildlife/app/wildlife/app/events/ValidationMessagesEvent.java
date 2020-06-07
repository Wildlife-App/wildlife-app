package com.wildlife.app.wildlife.app.events;

import com.wildlife.app.wildlife.app.models.constants.tables.validation.ValidForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeLinkSave;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler
public class ValidationMessagesEvent {
    private static final Logger LOG = LoggerFactory.getLogger(ValidationMessagesEvent.class);

    @HandleBeforeSave
    @HandleBeforeCreate
    @HandleBeforeLinkSave
    public void handleBeforeAddValidator(ValidForm validForm) {
        LOG.info("Updating inserting validators..");
        validForm.getFormFields().forEach(formField -> {
            formField.setFormFieldId(String.format("%s.%s", validForm.getFormName(),
                    formField.getFormFieldName()));
            formField.getValidationMessages().forEach(validationMessage -> {
                validationMessage.setValidationMessageId(
                        String.format("%s.%s.%s", validForm.getFormName(),
                        formField.getFormFieldName(),
                        validationMessage.getMessageKey()));
            });
        });
    }


}
