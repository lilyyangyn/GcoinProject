package com.gcoin.platform.service.impl;

import com.gcoin.platform.service.FileService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.Random;

@Log4j2
@Component
public class FileServiceImpl implements FileService {


//    @Value("${app.upload.dir:${user.home}}")
//    public String uploadDir;
    @Value("${file.storage.path}")
    private String fileStoragePath;

    @Override
    public String uploadFile(MultipartFile file) {
        String filename = null;
        try {
            Random rand = new Random();
            long times = 1000000000;
            long imageName = (long) (rand.nextDouble()*times);
            filename = imageName+".jpg";
//            Path copyLocation = Paths.get( "C:/UploadFile"+ File.separator + StringUtils.cleanPath(filename));
            Path copyLocation = Paths.get( fileStoragePath + StringUtils.cleanPath(filename));
            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            return filename;
        } catch (Exception e) {
            e.printStackTrace();
            return filename;
        }

    }

    @Override
    public String getImageBase64Str(String imgPath) throws IOException {
        File file = new File(imgPath);
        if(file.exists()){
            FileInputStream fileInputStream = new FileInputStream(imgPath);

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] b = new byte[1024];
            int len = -1;
            while((len = fileInputStream.read(b)) != -1) {
                bos.write(b, 0, len);
            }
            byte[] fileByte = bos.toByteArray();

            Base64.Encoder encoder = Base64.getEncoder();
            String data = encoder.encodeToString(fileByte);
            return data;
        }
        else{
            log.error("File not found");
            return null;
        }
    }
}
