export class ResourceImageModel {

  constructor(resourceImageId: number, resourceUrl: string, caption: string, resourceType: 'A' | 'L', animalId: number, tourId?: number) {
    this.resourceImageId = resourceImageId;
    this.resourceUrl = resourceUrl;
    this.resourceType = resourceType;
    this.animalId = animalId;
    this.tourId = tourId;
  }

  resourceImageId: number;
  resourceId: number;
  resourceUrl: string;
  resourceType: 'A' | 'L';
  animalId: number;
  tourId: number;
  caption: string;

  static fromData(data: ResourceImageModel): ResourceImageModel {
    const model = new ResourceImageModel(data.resourceImageId, data.resourceUrl, data.caption, data.resourceType, data.animalId);
    if (data.tourId) {
      model.tourId = +data.tourId;
    }
    model.resourceImageId = data.resourceId;
    model.resourceId = data.resourceId;
    return model;
  }
}
