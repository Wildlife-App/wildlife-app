package com.wildlife.app.wildlife.app.summary;

public enum SummaryGroup {
    LOCATION_NAME("location"),
    YEAR_OF_TOUR("year"),
    DEFAULT("location");

    private String value;

    SummaryGroup(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public static SummaryGroup fromValue(String value) {
        for (SummaryGroup sg : SummaryGroup.values()) {
            if (sg.value.equals(value)) {
                return sg;
            }
        }
        return SummaryGroup.DEFAULT;
    }

}
