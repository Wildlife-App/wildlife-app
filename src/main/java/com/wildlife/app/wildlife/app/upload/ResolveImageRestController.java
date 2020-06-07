package com.wildlife.app.wildlife.app.upload;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wildlife/v1/images/find")
@AllArgsConstructor
public class ResolveImageRestController {
    private ResourceImageService resourceImageService;

    @GetMapping
    public ResponseEntity<Object> findImage(@RequestParam("tourId") int tourId,
                                            @RequestParam("animalId") int animalId) {
        return new ResponseEntity<>(resourceImageService.findImages(tourId, animalId), HttpStatus.OK);
    }

}
