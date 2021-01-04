package com.gcoin.platform.error;

public enum EmBusinessError implements CommonError {

    USER_NOT_EXIST(20001,"User Not Exist"),
    USER_LOGIN_FAIL(20002,"Wrong Username or Password"),
    USER_NOT_LOGIN(20003,"Havn't Login"),
    USERNAME_USED(20004,"Username already existed"),
    INVALID_USR_PW_PATTERN(2005,"Please check your username and password's pattern matching the criteria"),
    ;

    private int errCode;
    private String errMsg;

    private EmBusinessError(int errCode, String errMsg) {
        this.errCode = errCode;
        this.errMsg = errMsg;
    }

    @Override
    public int getErrCode() {
        return this.errCode;
    }

    @Override
    public String getErrMsg() {
        return this.errMsg;
    }

    @Override
    public CommonError setErrMsg(String errMsg) {
        this.errMsg = errMsg;
        return this;
    }
}
