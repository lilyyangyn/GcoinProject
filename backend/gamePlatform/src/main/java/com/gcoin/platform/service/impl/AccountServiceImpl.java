package com.gcoin.platform.service.impl;

import com.gcoin.platform.dao.AccountDOMapper;
import com.gcoin.platform.dataobject.AccountDO;
import com.gcoin.platform.error.BusinessException;
import com.gcoin.platform.error.EmBusinessError;
import com.gcoin.platform.service.AccountService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Log4j2
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountDOMapper accountDOMapper;

    @Override
    public AccountDO login(String username, String password) {
        AccountDO accountDO = accountDOMapper.selectByUsername(username);
        return accountDO;
    }

    @Override
    public void registrate(String username, String password) throws BusinessException{
        log.info("Receive account registration Request");
        Validation(username,password);
        AccountDO accountDO = new AccountDO();
        accountDO.setUsername(username);
        accountDO.setPassword(password);
        System.out.println(accountDO.getUsername());
        Date date = new Date();
        accountDO.setRegistrationDate(date);
        int resultCode = accountDOMapper.insertSelective(accountDO);
        if(resultCode == 1){
            log.info("Success to write registration info to DB");
        }else {
            log.error("Failed to write registration info to DB with error occurred");
        }
    }

    public void Validation(String username,String password) throws BusinessException {
        AccountDO accountDO = accountDOMapper.selectByUsername(username);
        if (accountDO == null){
            if(username.length()>=5 && username.length()<=18 && password.length()>=8 && password.length()<=18){
                return;
            }
            log.info("Invalid username or password pattern");
            throw new BusinessException(EmBusinessError.INVALID_USR_PW_PATTERN);
        } else {
            log.info("Username already be used");
            throw new BusinessException(EmBusinessError.USERNAME_USED);
        }
    }
}
