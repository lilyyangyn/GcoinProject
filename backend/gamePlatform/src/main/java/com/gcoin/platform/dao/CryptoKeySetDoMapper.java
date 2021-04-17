package com.gcoin.platform.dao;

import com.gcoin.platform.dataobject.CryptoKeySetDo;

public interface CryptoKeySetDoMapper {
    int deleteByPrimaryKey(Integer crytoKeySetId);

    int insert(CryptoKeySetDo record);

    int insertSelective(CryptoKeySetDo record);

    CryptoKeySetDo selectByPrimaryKey(Integer crytoKeySetId);

    int updateByPrimaryKeySelective(CryptoKeySetDo record);

    int updateByPrimaryKey(CryptoKeySetDo record);
}