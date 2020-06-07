import {LocationModel} from "./location.model";
import {BaseResource} from "./base.resource";
import {equalDates} from "../app.constants";
import {ContentModel} from "./content.model";
import {TourPostModel} from "./post-models/tour-post.model";
import {stringify} from "querystring";
import {AnimalModel} from "./animal.model";

export class TourModel extends BaseResource {
  constructor(startDate: Date, endDate: Date, location: LocationModel | string, resourceId?: number, tourId?: number, safaris?: number) {
    super();
    this.resourceId = resourceId;
    this.tourId = tourId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.safaris = safaris;
    this.spottedAnimals = [];
  }

  resourceId?: number;
  tourId?: number;
  startDate: Date;
  endDate: Date;
  location: LocationModel | string;
  safaris: number;
  content: ContentModel<LocationModel>[];
  locationName: string;
  tourLocationId: number;
  spottedAnimals: AnimalModel[];
  private _isEmpty: boolean = false;

  private empty(): TourModel {
    this._isEmpty = true;
    return this;
  }

  toPostModel(): TourPostModel {
    const postModel = TourPostModel.newInstance().TourId(this.tourId).StartDate(this.startDate).EndDate(this.endDate).Safaris(this.safaris);
    postModel.spottedAnimals.length = 0;
    if (this.location instanceof LocationModel) {
      postModel.Location(this.location.getSelfLink());
    } else {
      postModel.Location(this.location);
    }
    return postModel;
  }

  equals(anotherTour: TourModel): boolean {
    return anotherTour
      && equalDates(this.startDate, anotherTour.startDate)
      && equalDates(this.endDate, anotherTour.endDate)
      && this.safaris === anotherTour.safaris;
  }

  static fromDataForView(data: TourModel): TourModel {
    let location: LocationModel;

    //checking for projection
    if (data.locationName && data.tourLocationId) {
      location = new LocationModel(data.locationName, 0, {}, data.tourLocationId, data.tourLocationId);
    }

    if (data.location) {
      location = <LocationModel>data.location;
    } else if (data.content && data.content.length > 0 && data.content[0].rel === 'location') {
      location = data.content[0].value;
    }

    const tour: TourModel = new TourModel(data.startDate, data.endDate,
      LocationModel.fromData(location),
      data.resourceId, data.resourceId, data.safaris);

    if (data.spottedAnimals && data.spottedAnimals.length > 0) {
      data.spottedAnimals.forEach(animal => tour.spottedAnimals.push(AnimalModel.fromData(animal)));
    }

    tour.links = tour.fromLinks(data.links);
    return tour;
  }

  static empty() {
    return new TourModel(new Date(), new Date(), '').empty();
  }

}
