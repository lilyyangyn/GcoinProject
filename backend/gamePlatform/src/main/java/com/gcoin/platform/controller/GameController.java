package com.gcoin.platform.controller;

import com.gcoin.platform.controller.viewObj.GameVO;
import com.gcoin.platform.dataobject.GameDo;
import com.gcoin.platform.response.Response;
import com.gcoin.platform.service.FileService;
import com.gcoin.platform.service.GameService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("game")
@CrossOrigin(origins = {"http://localhost:8080"},allowCredentials = "true")
//@CrossOrigin(origins = {"*"})
@Log4j2
public class GameController {

    @Autowired
    FileService fileService;
    @Autowired
    GameService gameService;

    @Value("${file.storage.path}")
    private String fileStoragePath;


    //thumbnailPath is the image file name in the default server image directory
    @RequestMapping("/register")
    public Response register(@RequestParam String gameName, @RequestParam int issuerID,
                         @RequestParam String trailerURL, @RequestParam String gameDescription,
                         @RequestParam String gameCategory, @RequestParam String thumbnailPath){
        boolean success = gameService.gameRegistration(gameName, issuerID, trailerURL, gameDescription, gameCategory, thumbnailPath);
        if(success == true){
            return new Response(null);
        }else {
            return new Response(Response.FAIL,
                    "Fail to write the game info to DB",null);
        }

    }

    @RequestMapping("/gamelist")
    public Response listGame(){
        List<GameDo> gameDoList = gameService.getGameList();

        List<GameVO> gameVOList = gameDoList.stream().map(gameDo -> {
            GameVO gameVO = null;
            try {
                gameVO = this.convertVOFromDO(gameDo);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return gameVO;
        }).collect(Collectors.toList());

        return new Response(gameVOList);
    }
    
    @RequestMapping("/gameinfo")
    public Response gameInfo(@RequestParam int gameID) {
        GameDo gameDo = gameService.getGameInfo(gameID);
        GameVO gameVO = null;
        try {
            gameVO = this.convertVOFromDO(gameDo);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Response(gameVO);
    }

    @RequestMapping("/thumbnail/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        String filename = fileService.uploadFile(file);
        return filename;
    }

    @RequestMapping("/thumbnail/{filename}")
    public Response getImgBase64Str(HttpServletResponse response, @PathVariable String filename) throws IOException {
        String filepath = "C:/UploadFile/"+filename;
        String imgBase64String = fileService.getImageBase64Str(filepath);
        return new Response(imgBase64String);
    }

    private GameVO convertVOFromDO(GameDo gameDo) throws IOException {
        if (gameDo == null) {
            return null;
        }
        GameVO gameVO = new GameVO();
        BeanUtils.copyProperties(gameDo,gameVO);
        String filepath = fileStoragePath+gameDo.getThumbnailPath();
        String imgBase64String = "data:image/jpg;base64," + fileService.getImageBase64Str(filepath);
        gameVO.setThumbnailBase64Str(imgBase64String);
        return gameVO;
    }


}
