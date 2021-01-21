package com.gcoin.platform.service.impl;

import com.gcoin.platform.dao.AccountDOMapper;
import com.gcoin.platform.dao.CryptoKeySetDoMapper;
import com.gcoin.platform.dataobject.AccountDO;
import com.gcoin.platform.dataobject.CryptoKeySetDo;
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

    @Autowired
    CryptoKeySetDoMapper cryptoKeySetDoMapper;

    @Override
    public AccountDO login(String username, String password) {
        AccountDO accountDO = accountDOMapper.selectByUsername(username);
        return accountDO;
    }

    @Override
    public void register(String username, String password, String publickey) throws BusinessException{

        //todo: need to make the account and cryptokey db insert transaction to atomic
        log.info("Receive account registration Request");
        Validation(username,password,publickey);
        AccountDO accountDO = new AccountDO();
        accountDO.setUsername(username);
        accountDO.setPassword(password);
        Date date = new Date();
        accountDO.setRegistrationDate(date);
        int resultCode = accountDOMapper.insertSelective(accountDO);
        if(resultCode == 1){
            log.info("Success to write account registration info to DB");
        }else {
            log.error("Failed to write account registration info to DB with error occurred");
        }

        //get the account_id
        accountDO = accountDOMapper.selectByUsername(username);
        int accountid = accountDO.getAccountId();

        //insert publickey to database
        if (accountid != 0){
            CryptoKeySetDo cryptoKeySetDo = new CryptoKeySetDo();
            cryptoKeySetDo.setAccountId(accountid);
            cryptoKeySetDo.setPublicKey(publickey);
            resultCode = cryptoKeySetDoMapper.insertSelective(cryptoKeySetDo);
            if(resultCode == 1){
                log.info("Success to write crypto key to DB");
            }else {
                log.error("Failed to write crypto key to DB with error occurred");
            }
        }
    }

    public void Validation(String username,String password, String publickey) throws BusinessException {


        AccountDO accountDO = accountDOMapper.selectByUsername(username);
        CryptoKeySetDo cryptoKeySetDo = cryptoKeySetDoMapper.selectByPublicKey(publickey);
        if (accountDO == null){
            //validate the account
            if(username.length()>=6 && username.length()<=18 && password.length()>=6 && password.length()<=18){
                //validate the publickey
                if (cryptoKeySetDo == null){
                    return;
                }else {
                    log.info("Crypto key already be used");
                    throw new BusinessException(EmBusinessError.CRYPTOKEY_USED);
                }
            }
            log.info("Invalid username or password pattern");
            throw new BusinessException(EmBusinessError.INVALID_USR_PW_PATTERN);
        } else {
            log.info("Username already be used");
            throw new BusinessException(EmBusinessError.USERNAME_USED);
        }

    }
}
