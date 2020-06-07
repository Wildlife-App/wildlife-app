import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AddAnimalComponent} from "../add-animal.component";
import {Observable} from "rxjs";
import {HttpService} from "../../http.service";
import {ANIMAL_EXCERPT, prepareUrl} from "../../app.constants";

@Injectable()
export class AnimalLoadSpottedAnimalsResolveService implements Resolve<AddAnimalComponent> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AddAnimalComponent> {
    const tourId: string = route.queryParamMap.get('tourId');

    console.log('Fetching SPOTTED ANINALS for tour id', tourId);

    const url: string = prepareUrl(['tours', tourId, 'spottedAnimals'],
      [{'projection': ANIMAL_EXCERPT}]);

    return this.httpService.getResource(url);
  }

}
