import {LocationModel} from "./location.model";
import {BaseResource} from "./base.resource";
import {equalDates} from "../app.constants";
import {ContentModel} from "./content.model";

export class TourModel extends BaseResource {
  constructor(startDate: Date, endDate: Date, location: LocationModel | string, resourceId?: number, tourId?: number, safaris?: number) {
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
  location: LocationModel | string;
  safaris: number;
  content: ContentModel<LocationModel>[];
  private _isEmpty: boolean = false;

  private empty(): TourModel {
    this._isEmpty = true;
    return this;
  }

  equals(anotherTour: TourModel): boolean {
    console.log('Comparing tours - ' +
      'this.startDate === anotherTour.startDate = ' + (equalDates(this.startDate, anotherTour.startDate))
      + ' this.endDate === anotherTour.endDate = ' + (equalDates(this.endDate, anotherTour.endDate))
      + ' this.safaris === anotherTour.safaris = ' + (this.safaris === anotherTour.safaris));
    return anotherTour
      && equalDates(this.startDate, anotherTour.startDate)
      && equalDates(this.endDate, anotherTour.endDate)
      && this.safaris === anotherTour.safaris;
  }

  static fromDataForView(data: TourModel): TourModel {
    console.log('Received data for converting to Tour Model', data);
    let location: LocationModel;

    if (data.location) {
      location = <LocationModel>data.location;
    } else if (data.content && data.content.length > 0 && data.content[0].rel === 'location') {
      location = data.content[0].value;
    }

    const tour: TourModel = new TourModel(data.startDate, data.endDate,
      LocationModel.fromData(location),
      data.resourceId, data.resourceId, data.safaris);

    tour.links = tour.fromLinks(data.links);
    console.log('Received data after converting to Tour Model', tour);
    return tour;
  }

  static empty() {
    return new TourModel(new Date(), new Date(), '').empty();
  }

}
