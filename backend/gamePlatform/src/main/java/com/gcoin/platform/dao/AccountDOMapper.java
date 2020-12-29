package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.AccountDO;

public interface AccountDOMapper {

    AccountDO selectByUsername(String username);

    int deleteByPrimaryKey(Integer accountId);

    int insert(AccountDO record);

    int insertSelective(AccountDO record);

    AccountDO selectByPrimaryKey(Integer accountId);

    int updateByPrimaryKeySelective(AccountDO record);

    int updateByPrimaryKey(AccountDO record);
}