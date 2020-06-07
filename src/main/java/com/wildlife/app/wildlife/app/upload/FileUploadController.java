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

    private ResourceImageService fileUploadService;

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile file,
                                         @RequestParam("caption") String caption,
                                         @RequestParam("resourceType") String resourceType,
                                         @RequestParam("animalId") int animalId,
                                         @RequestParam("tourId") int tourId) {
        FileUploadRequest request = FileUploadRequest.builder()
                .animalId(animalId)
                .caption(caption)
                .file(file)
                .resourceType(resourceType)
                .tourId(tourId)
                .build();
        LOG.info("Received file for uploading {}", request);
        return new ResponseEntity<>(fileUploadService.uploadFile(request), HttpStatus.CREATED);
    }
}
