export class FileUploadModel {

  constructor(file: File, caption: string, resourceType: 'A' | 'L', animalId: number, tourId: number) {
    this.file = file;
    this.caption = caption;
    this.resourceType = resourceType;
    this.animalId = animalId;
    this.tourId = tourId;
  }

  file: File;
  caption: string;
  resourceType: 'A' | 'L';
  animalId: number;
  tourId: number;
}
