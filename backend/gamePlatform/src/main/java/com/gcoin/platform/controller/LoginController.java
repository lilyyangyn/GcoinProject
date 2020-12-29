package com.gcoin.platform.controller;

import com.gcoin.platform.dao.AccountDOMapper;
import com.gcoin.platform.dataobject.AccountDO;
import com.gcoin.platform.response.Response;
import com.gcoin.platform.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
@CrossOrigin(origins = {"*"})
public class LoginController {

    @Autowired
    private AccountService accountService;

    @RequestMapping("/userlogin")
    public Response login( @RequestParam String username,
                           @RequestParam String password ) throws Exception{

        AccountDO account = accountService.login(username, password);

        if(account == null){
            return new Response(Response.FAIL,
                    "Invalid Account / Password",null);
        }else {
            return new Response(account);
        }
    }
}
