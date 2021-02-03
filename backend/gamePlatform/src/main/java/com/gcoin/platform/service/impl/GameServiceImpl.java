package com.gcoin.platform.service.impl;

import com.gcoin.platform.dao.GameDoMapper;
import com.gcoin.platform.dataobject.GameDo;
import com.gcoin.platform.service.GameService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Log4j2
public class GameServiceImpl implements GameService {

    @Autowired
    GameDoMapper gameDoMapper;

    @Override
    public boolean gameRegistration(String gameName, int issuerID, String trailerURL, String gameDescription,
                                 String category, String thumbnailPath) {
        //Param setting
        GameDo gameDo = new GameDo();
        gameDo.setName(gameName);
        gameDo.setCompanyId(issuerID);
        gameDo.setTrailerUrl(trailerURL);
        gameDo.setGameDescription(gameDescription);
        gameDo.setCategory(category);
        gameDo.setThumbnailPath(thumbnailPath);
        gameDo.setIssueDate(new Date());

        int resultCode = gameDoMapper.insertSelective(gameDo);
        if(resultCode == 1){
            log.info("Success to write game registration info to DB");
            return true;
        }else {
            log.error("Failed to write game registration info to DB with error occurred");
            return false;
        }
    }

    @Override
    public List<GameDo> getGameList() {
        return gameDoMapper.listGame();
    }


}
