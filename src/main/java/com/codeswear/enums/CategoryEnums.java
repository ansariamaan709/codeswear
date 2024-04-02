package com.codeswear.enums;


public enum CategoryEnums {
    TSHIRTS(1),
    HOODIES(2),
    PANTS(3);

    private final int code;

    CategoryEnums(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
