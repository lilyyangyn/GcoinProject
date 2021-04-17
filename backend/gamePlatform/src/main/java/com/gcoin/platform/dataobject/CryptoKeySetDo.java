package com.gcoin.platform.dataobject;

public class CryptoKeySetDo {
    private Integer crytoKeySetId;

    private Integer accountId;

    private String publicKey;

    public Integer getCrytoKeySetId() {
        return crytoKeySetId;
    }

    public void setCrytoKeySetId(Integer crytoKeySetId) {
        this.crytoKeySetId = crytoKeySetId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey == null ? null : publicKey.trim();
    }
}