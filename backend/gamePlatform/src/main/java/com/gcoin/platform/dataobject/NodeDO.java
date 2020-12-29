package com.gcoin.platform.dataobject;

public class NodeDO {
    private Integer blockchainNodeId;

    private Integer companyId;

    private String enodeAddress;

    public Integer getBlockchainNodeId() {
        return blockchainNodeId;
    }

    public void setBlockchainNodeId(Integer blockchainNodeId) {
        this.blockchainNodeId = blockchainNodeId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getEnodeAddress() {
        return enodeAddress;
    }

    public void setEnodeAddress(String enodeAddress) {
        this.enodeAddress = enodeAddress == null ? null : enodeAddress.trim();
    }
}