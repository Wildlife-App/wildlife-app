package com.wildlife.app.wildlife.app.models.db.constants;

public interface ConstantData {
    boolean isEmpty();

    default boolean isNotEmpty() {
        return !isEmpty();
    }
}
