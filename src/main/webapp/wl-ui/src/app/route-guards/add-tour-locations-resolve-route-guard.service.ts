import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TourModel} from "../models/tour.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {prepareUrl, TOUR_EXCERPT} from "../app.constants";
import {LocationModel} from "../models/location.model";

@Injectable()
export class AddTourLocationsResolveRouteGuardService implements Resolve<LocationModel[]> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel[]> {
    console.log('Loading Tour...');
    return this.httpService.getResource(prepareUrl(['/locations']));
  }

}
