package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.NodeDO;

public interface NodeDOMapper {
    int deleteByPrimaryKey(Integer blockchainNodeId);

    int insert(NodeDO record);

    int insertSelective(NodeDO record);

    NodeDO selectByPrimaryKey(Integer blockchainNodeId);

    int updateByPrimaryKeySelective(NodeDO record);

    int updateByPrimaryKey(NodeDO record);
}