package com.wildlife.app.wildlife.app.models.constants;

public interface ConstantData {
    boolean isEmpty();

    default boolean isNotEmpty() {
        return !isEmpty();
    }
}
