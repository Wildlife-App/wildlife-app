import {BaseResource} from "./base.resource";

export class ExistenceStatusModel extends BaseResource {

  constructor(existenceStatusId: string, existenceStatus: string, existenceStatusDescription: string) {
    super();
    this.existenceStatusId = existenceStatusId;
    this.existenceStatus = existenceStatus;
    this.existenceStatusDescription = existenceStatusDescription;
  }

  existenceStatusId: string;
  existenceStatus: string;
  existenceStatusDescription: string;

  static fromData(data: ExistenceStatusModel): ExistenceStatusModel {
    const existenceStatus = new ExistenceStatusModel(data.existenceStatusId, data.existenceStatus, data.existenceStatusDescription);
    existenceStatus.links = existenceStatus.fromLinks(data.links);
    return existenceStatus;
  }

  static createEmpty(): ExistenceStatusModel {
    return new ExistenceStatusModel('', '', '');
  }
}
