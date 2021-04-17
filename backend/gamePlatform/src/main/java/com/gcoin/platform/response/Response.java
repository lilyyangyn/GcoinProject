package com.gcoin.platform.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

//class to unify response format
@AllArgsConstructor
public class Response {

    public static final int SUCCESS = 0;
    public static final int FAIL = 1;

    @Getter
    private int code;

    @Getter
    private String message;

    @Getter
    private Object data;


    public Response(Object data){
        this(0,"",data);
    }
}
