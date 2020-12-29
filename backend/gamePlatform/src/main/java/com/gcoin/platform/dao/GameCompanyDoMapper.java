package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.GameCompanyDo;

public interface GameCompanyDoMapper {
    int deleteByPrimaryKey(Integer companyId);

    int insert(GameCompanyDo record);

    int insertSelective(GameCompanyDo record);

    GameCompanyDo selectByPrimaryKey(Integer companyId);

    int updateByPrimaryKeySelective(GameCompanyDo record);

    int updateByPrimaryKey(GameCompanyDo record);
}