package com.gcoin.platform.service;

import com.gcoin.platform.dataobject.GameDo;

import java.util.List;

public interface GameService {
    public boolean gameRegistration(String gameName, int issuerID, String trailerURL, String gameDescription,
                                 String category, String thumbnailPath);

    public List<GameDo> getGameList();
}
