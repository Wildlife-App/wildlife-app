export class ResourceImageModel {

  constructor(resourceImageId: number, resourceUrl: string, resourceType: 'location' | 'animal', relatedResourceId: number) {
    this.resourceImageId = resourceImageId;
    this.resourceUrl = resourceUrl;
    this.resourceType = resourceType;
    this.relatedResourceId = relatedResourceId;
  }

  resourceImageId: number;
  resourceUrl: string;
  resourceType: 'location' | 'animal';
  relatedResourceId: number;

  static fromData(data: ResourceImageModel): ResourceImageModel {
    return new ResourceImageModel(data.resourceImageId, data.resourceUrl, data.resourceType, data.relatedResourceId);
  }
}
