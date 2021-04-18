package com.gcoin.platform.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    String uploadFile(MultipartFile file);
    String getImageBase64Str(String imgPath) throws IOException;
}
