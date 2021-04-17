package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.PlayerDO;

public interface PlayerDOMapper {
    int deleteByPrimaryKey(Integer playerId);

    int insert(PlayerDO record);

    int insertSelective(PlayerDO record);

    PlayerDO selectByPrimaryKey(Integer playerId);

    int updateByPrimaryKeySelective(PlayerDO record);

    int updateByPrimaryKey(PlayerDO record);
}