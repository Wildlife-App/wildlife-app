import {LocationModel} from "./location.model";
import {TourModel} from "./tour.model";

export class SummaryLoaderModel {
  constructor() {
    this.tours = [];
  }

  location: LocationModel;
  tours: TourModel[];

  static extractFromLocation(data: LocationModel): SummaryLoaderModel {
    const model: SummaryLoaderModel = new SummaryLoaderModel();
    model.location = LocationModel.fromData(data);

    data.tours.forEach(tour => {
      tour.location = undefined;
      model.tours.push(TourModel.fromDataForView(tour));
    });

    return model;
  }
}
