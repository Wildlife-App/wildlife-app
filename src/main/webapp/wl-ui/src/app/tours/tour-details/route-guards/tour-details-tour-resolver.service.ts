import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TourDetailsComponent} from "../tour-details.component";
import {Observable} from "rxjs";
import {HttpService} from "../../../http.service";
import {ANIMAL_EXCERPT, prepareUrl, TOUR_EXCERPT} from "../../../app.constants";

@Injectable()
export class TourDetailsTourResolverService implements Resolve<TourDetailsComponent> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TourDetailsComponent> {
    const currentTourId: string = route.paramMap.get('id');
    return this.httpService.getResource(prepareUrl(['tours', currentTourId],
      [{'projection': TOUR_EXCERPT}]));
  }

}
