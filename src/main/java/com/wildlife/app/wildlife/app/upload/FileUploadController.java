package com.wildlife.app.wildlife.app.upload;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/wildlife/v1")
public class FileUploadController {
    private static final Logger LOG = LoggerFactory.getLogger(FileUploadController.class);

    private FileUploadService fileUploadService;

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile multipartFile) {
        LOG.info("Received file for uploading {}", multipartFile);
        return new ResponseEntity<>(fileUploadService.uploadFile(multipartFile), HttpStatus.CREATED);
    }
}
