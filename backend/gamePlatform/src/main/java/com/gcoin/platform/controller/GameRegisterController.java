package com.gcoin.platform.controller;

import com.gcoin.platform.response.Response;
import com.gcoin.platform.service.FileService;
import com.gcoin.platform.service.GameService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
@RequestMapping("gameregistration")
@CrossOrigin(origins = {"http://localhost:8080"},allowCredentials = "true")
//@CrossOrigin(origins = {"*"})
@Log4j2
public class GameRegisterController {

    @Autowired
    FileService fileService;
    @Autowired
    GameService gameService;

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

    @RequestMapping("/fileupload")
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        String filename = fileService.uploadFile(file);
        return filename;
    }

    @RequestMapping("/getimage/{filename}")
    public String getFile(HttpServletResponse response, @PathVariable String filename) throws IOException {
        String filepath = "C:/UploadFile/"+filename;
        String imgBase64String = fileService.getImageBase64Str(filepath);
        return imgBase64String;
    }
}
