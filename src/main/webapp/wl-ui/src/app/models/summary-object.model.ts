import {TourModel} from "./tour.model";

export class SummaryObjectModel {
  constructor() {
    this.tours = [];
  }

  groupByValue: string;
  tours: TourModel[];
  tourCount: number;
  label: string;

  static fromData(data: SummaryObjectModel): SummaryObjectModel {
    const model: SummaryObjectModel = new SummaryObjectModel();
    model.groupByValue = data.groupByValue;
    model.label = data.label;
    
    data.tours.forEach(tour => {
      tour.location = undefined;
      model.tours.push(TourModel.fromDataForView(tour));
    });

    model.tourCount = data.tourCount;

    return model;
  }
}
