package com.wildlife.app.wildlife.app.controller;

import com.wildlife.app.wildlife.app.exception.AppNotImplementedException;
import com.wildlife.app.wildlife.app.models.json.AnimalJson;
import com.wildlife.app.wildlife.app.service.WildlifeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@RestController
//@RequestMapping("/wildlife/app")
@AllArgsConstructor
public class WildlifeRestController {
    private WildlifeService wildlifeService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createAnimalRecord(@RequestBody AnimalJson animalJson) {
        return new ResponseEntity<>(wildlifeService.addAnimal(animalJson), HttpStatus.CREATED);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllAnimals() {
        return new ResponseEntity<>(wildlifeService.allAnimals(), HttpStatus.OK);
    }

    @GetMapping(value = "/byid/{animalId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> findById(@PathVariable("animalId") String animalId) {
        return new ResponseEntity<>(wildlifeService.findAnimalById(animalId), HttpStatus.OK);
    }

    @GetMapping(value = "/byname/{animalName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> findByName(@PathVariable("animalName") String animalName) {
        return new ResponseEntity<>(wildlifeService.findAnimalByName(animalName), HttpStatus.OK);
    }

    @GetMapping(value = "/byscname/{scientificName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> findByScientificName(@PathVariable("scientificName") String scientificName) {
        return new ResponseEntity<>(wildlifeService.findAnimalByScientificName(scientificName), HttpStatus.OK);
    }

    @GetMapping(value = "/search/{searchStr}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> searchAnimal(@PathVariable("searchStr") String searchStr) {
        return new ResponseEntity<>(wildlifeService.searchAnimal(searchStr), HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> updateAnimalRecord(@RequestBody AnimalJson animalJson) {
        throw AppNotImplementedException.notImplemented();
    }

}
