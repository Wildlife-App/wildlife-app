import {LinkModel} from "./link.model";
import {BaseResource} from "./base.resource";

export class StateModel extends BaseResource {
  nationalStateCode?: string;
  stateCode?: string = this.nationalStateCode;
  stateName: string;

  static emptyState(): StateModel {
    const emptyModel = new StateModel();
    emptyModel.stateName = '-- Select State --';
    emptyModel.nationalStateCode = '';
    emptyModel.links = [];
    return emptyModel;
  }

  static fromState(state: StateModel): StateModel {
    const newState = new StateModel();
    newState.stateName = state.stateName;
    newState.nationalStateCode = state.nationalStateCode;
    newState.stateCode = state.nationalStateCode;
    newState.links = newState.fromLinks(state.links);
    return newState;
  }
}
