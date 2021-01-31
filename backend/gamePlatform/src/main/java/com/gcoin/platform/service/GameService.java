package com.gcoin.platform.service;

public interface GameService {
    public boolean gameRegistration(String gameName, int issuerID, String trailerURL, String gameDescription,
                                 String category, String thumbnailPath);
}
