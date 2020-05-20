import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TourModel} from "../models/tour.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {prepareUrl, TOUR_EXCERPT} from "../app.constants";

@Injectable()
export class EditTourResolveRouteGuardService implements Resolve<TourModel> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TourModel> {
    const editing: string = route.queryParamMap.get('editing');

    if (!editing) {
      return undefined;
    }
    const url: string = prepareUrl(['/tours', editing],
      [{'projection': TOUR_EXCERPT}]);

    console.log('Loading Tour...');
    return this.httpService.getResource(url);
  }

}
