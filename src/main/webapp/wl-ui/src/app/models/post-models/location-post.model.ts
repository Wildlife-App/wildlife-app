import {PostModel} from "./post.model";

export class LocationPostModel implements PostModel {
  private resourceId: number;
  private locationId: number;
  private locationName: string;
  private area: number;
  private state: string;

  static newInstance(): LocationPostModel {
    return new LocationPostModel();
  }

  ResourceId(value: number) {
    this.resourceId = value;
    return this;
  }

  LocationId(value: number) {
    this.locationId = value;
    return this;
  }

  LocationName(value: string) {
    this.locationName = value;
    return this;
  }

  Area(value: number) {
    this.area = value;
    return this;
  }

  State(value: string) {
    this.state = value;
    return this;
  }
}
