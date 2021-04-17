package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.GamePlayDo;

public interface GamePlayDoMapper {
    int deleteByPrimaryKey(Integer gameId);

    int insert(GamePlayDo record);

    int insertSelective(GamePlayDo record);

    GamePlayDo selectByPrimaryKey(Integer gameId);

    int updateByPrimaryKeySelective(GamePlayDo record);

    int updateByPrimaryKey(GamePlayDo record);
}