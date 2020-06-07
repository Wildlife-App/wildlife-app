import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "../../../http.service";
import {prepareUrl} from "../../../app.constants";
import {LocationModel} from "../../../models/location.model";

@Injectable()
export class AddTourLocationsResolveRouteGuardService implements Resolve<LocationModel[]> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel[]> {
    const resourceId = route.queryParamMap.get('resourceId');

    if (resourceId && +resourceId > 0) {
      console.log('Requested with resource id. Loading single location');
      return this.httpService.getResource(prepareUrl(['/locations', resourceId]));
    } else {
      console.log('Requested without resource id. Loading all locations');
      return this.httpService.getResource(prepareUrl(['/locations']));
    }
  }
}
