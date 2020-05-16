package com.wildlife.app.wildlife.app.models.constants.tables.validation;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "validation_tbl_validation_messages")
public class ValidationMessage {
    @Id
    @Column(name = "validation_message_id", length = 100)
    private String validationMessageId;

    @Column(name = "message_key", length = 50, nullable = false)
    private String messageKey;

    @Column(name = "message_text", length = 100, nullable = false)
    private String messageText;
}
