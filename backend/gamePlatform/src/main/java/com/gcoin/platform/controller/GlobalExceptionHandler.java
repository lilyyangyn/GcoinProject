package com.gcoin.platform.controller;

import com.gcoin.platform.error.BusinessErrObj;
import com.gcoin.platform.error.BusinessException;
import com.gcoin.platform.error.EmBusinessError;
import com.gcoin.platform.response.Response;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
@Log4j2
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public Response exceptionHandler(HttpServletRequest request, Exception e){
        log.error(e);
        if(e instanceof BusinessException){
            //BusinessErrObj businessErrObj = new BusinessErrObj(((BusinessException) e).getErrCode(),((BusinessException) e).getErrMsg());
            return new Response(Response.FAIL,"Business exception", ((BusinessException) e).getErrMsg());
        }else{
            return new Response(Response.FAIL,
                    "Unknown Error Happened",
                    null);
        }
    }
}