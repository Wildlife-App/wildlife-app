package com.wildlife.app.wildlife.app.upload;

import com.wildlife.app.wildlife.app.models.UploadedFile;
import com.wildlife.app.wildlife.app.repository.FileUploadRepository;
import com.wildlife.app.wildlife.app.util.AppUtil;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@AllArgsConstructor
public class FileUploadService {
    private static final Logger LOG = LoggerFactory.getLogger(FileUploadService.class);
    private FileUploadRepository fileUploadRepository;
    private static final String USR_DIR = "D:\\UploadedImages\\";

    UploadedFile uploadFile(MultipartFile file) {
        String uploadedName = file.getName() + "_" + AppUtil.generateId();
        UploadedFile uploadedFile = UploadedFile.builder()
                .fileName(uploadedName)
                .fullUrl(doUploadFile(file))
                .build();

        return fileUploadRepository.save(uploadedFile);
    }

    private String doUploadFile(MultipartFile file) {
        File uploadDir = new File(USR_DIR);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdir();
            LOG.info("Created dir {}", created);
        }
        Path fileNamePath = Paths.get(USR_DIR, file.getOriginalFilename());
        try {
            Files.write(fileNamePath, file.getBytes());
        } catch (IOException e) {
            LOG.error("Error uploading file", e);
        }

        return fileNamePath.toString();
    }
}
