export class ResourceImageModel {

  constructor(resourceImageId: number, resourceUrl: string, resourceType: 'location' | 'animal', relatedResourceId: number, tourId?: number) {
    this.resourceImageId = resourceImageId;
    this.resourceUrl = resourceUrl;
    this.resourceType = resourceType;
    this.relatedResourceId = relatedResourceId;
    this.tourId = tourId;
  }

  resourceImageId: number;
  resourceUrl: string;
  resourceType: 'location' | 'animal';
  relatedResourceId: number;
  tourId: number;

  static fromData(data: ResourceImageModel): ResourceImageModel {
    const model = new ResourceImageModel(data.resourceImageId, data.resourceUrl, data.resourceType, data.relatedResourceId);
    if (data.tourId) {
      model.tourId = +data.tourId;
    }
    return model
  }
}
