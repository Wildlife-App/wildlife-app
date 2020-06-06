import {SummaryObjectModel} from "./summary-object.model";

export class SummaryResponseModel {
  constructor() {
    this.summaries = [];
  }
  summaries: SummaryObjectModel[];
  groupBy: string;
  totalTours: number;

  static fromData(data: SummaryResponseModel): SummaryResponseModel {
    const response = new SummaryResponseModel();
    data.summaries.forEach(model => response.summaries.push(SummaryObjectModel.fromData(model)));
    response.groupBy = data.groupBy;
    response.totalTours = data.totalTours;

    return response;
  }
}
