package com.gcoin.platform.service;

import com.gcoin.platform.dataobject.AccountDO;
import org.springframework.stereotype.Service;

public interface AccountService {
    AccountDO login(String username, String password);
}
