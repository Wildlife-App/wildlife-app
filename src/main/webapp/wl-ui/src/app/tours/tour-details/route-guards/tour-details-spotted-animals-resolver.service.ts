import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TourDetailsComponent} from "../tour-details.component";
import {HttpService} from "../../../http.service";
import {Observable} from "rxjs";
import {ANIMAL_EXCERPT, prepareUrl} from "../../../app.constants";

@Injectable()
export class TourDetailsSpottedAnimalsResolverService implements Resolve<TourDetailsComponent> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TourDetailsComponent> {
    const currentTourId: string = route.paramMap.get('id');

    return this.httpService.getResource(prepareUrl(['tours', currentTourId, 'spottedAnimals'],
      [{'projection': ANIMAL_EXCERPT}]));
  }

}
