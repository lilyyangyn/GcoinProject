package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.GameDo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameDoMapper {
    int deleteByPrimaryKey(Integer gameId);

    int insert(GameDo record);

    int insertSelective(GameDo record);

    GameDo selectByPrimaryKey(Integer gameId);

    int updateByPrimaryKeySelective(GameDo record);

    int updateByPrimaryKey(GameDo record);

    //self write interface
    List<GameDo> listGame();
}