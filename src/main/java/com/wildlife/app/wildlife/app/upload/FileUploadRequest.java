package com.wildlife.app.wildlife.app.upload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
class FileUploadRequest implements Serializable {
    private static final long serialVersionUID = -2487981912389784837L;

    private MultipartFile file;

    private String caption;

    private String resourceType;

    private int animalId;

    private int tourId;

}
