import {StateModel} from "./state.model";
import {BaseResource} from "./base.resource";

export class LocationModel extends BaseResource {
  constructor(
    locationName: string,
    area: number,
    state: any,
    resourceId?: number,
    locationId?: number) {
    super();
    this.resourceId = resourceId;
    this.locationId = locationId;
    this.locationName = locationName;
    this.area = area;
    this.state = state;
  }

  resourceId?: number;
  locationId?: number;
  locationName: string;
  area: number;
  state: any;

  static fromData(data: LocationModel): LocationModel {
    const locationModel = new LocationModel(data.locationName, +data.area,
      StateModel.fromState(<StateModel>data.state).getSelfLink(),
      +data.resourceId, +data.resourceId);
    locationModel.links = locationModel.fromLinks(data.links);
    return locationModel;
  }

  static empty(): LocationModel {
    return new LocationModel('', 0, {}, 0, 0);
  }
}
