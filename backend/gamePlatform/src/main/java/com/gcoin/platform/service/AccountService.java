package com.gcoin.platform.service;

import com.gcoin.platform.dataobject.AccountDO;
import com.gcoin.platform.error.BusinessException;
import org.springframework.stereotype.Service;

public interface AccountService {
    AccountDO login(String username, String password);

    void register(String username, String password, String publickey) throws BusinessException;
}
