package com.gcoin.platform.service.impl;

import com.gcoin.platform.dao.AccountDOMapper;
import com.gcoin.platform.dataobject.AccountDO;
import com.gcoin.platform.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountDOMapper accountDOMapper;

    @Override
    public AccountDO login(String username, String password) {
        AccountDO accountDO = accountDOMapper.selectByUsername(username);
        return accountDO;
    }
}
