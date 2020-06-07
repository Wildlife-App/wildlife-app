import {PostModel} from "./post.model";

export class TourPostModel implements PostModel {
  resourceId?: number;
  tourId?: number;
  private startDate: Date;
  private endDate: Date;
  private location: string;
  private safaris: number;
  spottedAnimals: string[] = [];

  static newInstance(): TourPostModel {
    return new TourPostModel();
  }

  reset(): void {
    this.ResourceId(0).TourId(0).StartDate(undefined).EndDate(undefined).Location(undefined).Safaris(undefined);
    this.spottedAnimals.length = 0;
  }

  ResourceId(value: number) {
    this.resourceId = value;
    return this;
  }

  TourId(value: number) {
    this.tourId = value;
    return this;
  }

  StartDate(value: Date) {
    this.startDate = value;
    return this;
  }

  EndDate(value: Date) {
    this.endDate = value;
    return this;
  }

  Location(value: string) {
    this.location = value;
    return this;
  }

  Safaris(value: number) {
    this.safaris = value;
    return this;
  }

  Animal(value: string) {
    this.spottedAnimals.push(value);
  }
}
