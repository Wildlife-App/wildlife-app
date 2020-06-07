package com.wildlife.app.wildlife.app.upload;

import com.wildlife.app.wildlife.app.exception.AppLoadingException;
import com.wildlife.app.wildlife.app.models.ResourceImage;
import com.wildlife.app.wildlife.app.repository.ResourceImageRepository;
import com.wildlife.app.wildlife.app.util.AppUtil;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Service
@AllArgsConstructor
public class ResourceImageService {
    private static final Logger LOG = LoggerFactory.getLogger(ResourceImageService.class);
    private static final String USR_DIR = "D:\\UploadedImages\\";

    private ResourceImageRepository resourceImageRepository;

    ResourceImage uploadFile(FileUploadRequest request) {
        String uploadedName = request.getCaption() + "_" + AppUtil.generateId();
        ResourceImage uploadedFile = ResourceImage.builder()
                .caption(uploadedName)
                .resourceUrl(doUploadFile(request.getFile()))
                .resourceType(request.getResourceType())
                .tourId(request.getTourId())
                .animalId(request.getAnimalId())
                .build();
        ResourceImage saved = resourceImageRepository.save(uploadedFile);
        encodeImage(saved);
        return saved;
    }

    List<ResourceImage> findImages(int tourId, int animalId) {
        List<ResourceImage> allImages = resourceImageRepository.findAllByAnimalIdAndTourId(animalId, tourId);
        if (!allImages.isEmpty()) {
            encodeImage(allImages.get(0));
        }
        return allImages;
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

    private void encodeImage(ResourceImage imageObj) {
        String path = imageObj.getResourceUrl();
        File imageFile = new File(path);
        String ext = FilenameUtils.getExtension(path);

        try (FileInputStream fis = new FileInputStream(imageFile)) {

            byte[] bytes = new byte[(int) imageFile.length()];
            int read = fis.read(bytes);
            LOG.info("Read bytes: {}", read);
            String encodeBase64 = Base64.getEncoder().encodeToString(bytes);

            String finalUrl = String.format("data:image/%s;base64,%s", ext, encodeBase64);
            imageObj.setResourceUrl(finalUrl);
        } catch (Exception e) {
            throw new AppLoadingException(e);
        }
    }
}
