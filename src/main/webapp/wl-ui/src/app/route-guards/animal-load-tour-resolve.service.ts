import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TourModel} from "../models/tour.model";
import {Observable} from "rxjs";
import {HttpService} from "../http.service";
import {prepareUrl} from "../app.constants";

@Injectable()
export class AnimalLoadTourResolveService implements Resolve<TourModel> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TourModel> {
    const tourId: string = route.queryParamMap.get('tourId');

    if (tourId) {
      return this.httpService.getResource(prepareUrl(['tours', tourId]));
    }
    return undefined;
  }

}
