import {LocationModel} from "./location.model";
import {BaseResource} from "./base.resource";

export class TourModel extends BaseResource {
  constructor(startDate: Date, endDate: Date, location: any, resourceId?: number, tourId?: number, safaris?: number) {
    super();
    this.resourceId = resourceId;
    this.tourId = tourId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.safaris = safaris;
  }

  resourceId?: number;
  tourId?: number;
  startDate: Date;
  endDate: Date;
  location: any;
  safaris: number;
  private _isEmpty: boolean = false;

  private empty(): TourModel {
    this._isEmpty = true;
    return this;
  }

  isEmpty(): boolean {
    return this._isEmpty;
  }

  static fromData(data: TourModel): TourModel {
    const tour: TourModel = new TourModel(data.startDate, data.endDate,
      LocationModel.fromData(data.location).getSelfLink(),
      data.resourceId, data.resourceId);
    tour.links = tour.fromLinks(data.links);
    return tour;
  }

  static fromDataForView(data: TourModel): TourModel {
    console.log('Received data for converting to Tour Model', data);
    const tour: TourModel = new TourModel(data.startDate, data.endDate,
      LocationModel.fromData(data.location),
      data.resourceId, data.resourceId, data.safaris);

    tour.links = tour.fromLinks(data.links);
    return tour;
  }

  static copy(from: TourModel, to: TourModel): void {
    to.resourceId = from.resourceId;
    to.tourId = from.tourId;
    to.startDate = from.startDate;
    to.endDate = from.endDate;
    to.location = from.location;
    to._isEmpty = from._isEmpty;
    to.safaris = from.safaris;
  }

  static empty() {
    return new TourModel(new Date(), new Date(), '').empty();
  }

}
