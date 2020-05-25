import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {prepareUrl} from "../app.constants";
import {LocationModel} from "../models/location.model";

@Injectable()
export class AddTourLocationsResolveRouteGuardService implements Resolve<LocationModel[]> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel[]> {
    return this.httpService.getResource(prepareUrl(['/locations']));
  }
}
