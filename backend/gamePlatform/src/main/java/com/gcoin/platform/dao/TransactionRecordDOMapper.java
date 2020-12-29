package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.TransactionRecordDO;

public interface TransactionRecordDOMapper {
    int deleteByPrimaryKey(Integer transactionId);

    int insert(TransactionRecordDO record);

    int insertSelective(TransactionRecordDO record);

    TransactionRecordDO selectByPrimaryKey(Integer transactionId);

    int updateByPrimaryKeySelective(TransactionRecordDO record);

    int updateByPrimaryKey(TransactionRecordDO record);
}