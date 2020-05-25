package com.wildlife.app.wildlife.app.util;

import java.util.Arrays;
import java.util.List;

public interface ErrorConstants {
    List<Character> INVALID_CHARS_LIST = Arrays.asList('~', '!', '@','#', '$', '%', '^', '&', '*', '=', '<', '>', '?', '/', '"', '\'', '_', '|', '{', '}', '[', ']');
    List<String> VALID_MID_CHARS = Arrays.asList("(", ")");
    String DUPLICATE_ANIMAL_NAME = "1000";
    String DUPLICATE_ANIMAL_SCIENTIFIC_NAME = "1001";
    String EMPTY_ANIMAL_NAME = "1002";
    String EMPTY_ANIMAL_SCIENTIFIC_NAME = "1003";
    String ANIMAL_NAME_CONTAINS_DIGIT_SP_CHAR = "1004";
    String ANIMAL_SCIENTIFIC_NAME_CONTAINS_DIGIT_SP_CHAR = "1005";
    String EMPTY_ANIMAL_GENDER = "1006";
    String INVALID_ANIMAL_GENDER = "1007";
    String DUPLICATE_LOCATION = "1008";
    String EMPTY_LOCATION = "1009";
    String LOCATION_MIN_LENGTH = "1010";
    String LOCATION_MAX_LENGTH = "1011";
    String LOCATION_NAME_STARTS_WITH_NUMBER = "1012";
    String LOCATION_NAME_CONTAINS_INVALID_CHAR = "1013";
    String EMPTY_STATE = "1014";
    String INVALID_STATE = "1015";
    String NEGATIVE_AREA = "1016";
    String OVERLAPPING_TOUR_DATES = "1017";
    String START_DATE_AFTER_END_DATE = "1018";
    String NEGATIVE_SAFARI_COUNT = "1019";
    String SAFARIS_MORE_THAN_POSSIBLE = "1020";

}
