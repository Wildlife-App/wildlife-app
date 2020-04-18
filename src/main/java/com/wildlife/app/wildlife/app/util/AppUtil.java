package com.wildlife.app.wildlife.app.util;


import org.apache.commons.lang3.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

public final class AppUtil {
    private AppUtil() {
    }

    private static final String DATE_FORMAT = "dd-MMM-yyyy '@' HH:mm:ss";
    private static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat(DATE_FORMAT);
    private static final Random RANDOM = new Random();

    public static <E, R> Collection<R> toCollection(Collection<E> items, Function<? super E, R> function) {
        return items.stream().map(function).collect(Collectors.toList());
    }

    public static String getCurrentDateAsString() {
        return DATE_FORMATTER.format(new Date());
    }

    public static long generateId() {
        return (System.currentTimeMillis() + RANDOM.nextInt());
    }

    public static String mask(String stringToMask) {
        char[] chars = stringToMask.toCharArray();
        if (chars.length < 5) {
            return "XXXX" + chars[chars.length - 1];
        }
        return mask(stringToMask, chars.length/2);
    }
    public static String mask(String stringToMask, int charactersToMask) {
        char[] chars = stringToMask.toCharArray();
        for (int i = 0; i < charactersToMask; i++) {
            chars[i] = 'X';
        }
        return new String(chars);
    }

    public static String titleCase(String name) {

        String[] tokens = name.split(" ");

        StringBuilder sb = new StringBuilder();

        for (String token : tokens) {
            if(StringUtils.isAllUpperCase(token)) {
                sb.append(token);
            } else {
                String toLowerCase = token.toLowerCase();
                int length = toLowerCase.length();
                sb.append((char) (toLowerCase.charAt(0) - 32));
                if (length > 1) {
                    sb.append(toLowerCase.substring(1, length));
                }
            }
            sb.append(" ");
        }

        return sb.toString().trim();
    }
    public static boolean isUpdatable(Object from, Object to) {
        if(Objects.equals(from, to) || to == null) {
            return false;
        }
        if(from == null) {
            return true;
        }
        return !from.equals(titleCase(Objects.toString(to)));
    }
}
