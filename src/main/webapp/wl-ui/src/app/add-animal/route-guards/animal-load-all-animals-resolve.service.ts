import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AddAnimalComponent} from "../add-animal.component";
import {Observable} from "rxjs";
import {HttpService} from "../../http.service";
import {ANIMAL_EXCERPT, prepareUrl} from "../../app.constants";

@Injectable()
export class AnimalLoadAllAnimalsResolveService implements Resolve<AddAnimalComponent> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AddAnimalComponent> {
    const url: string = prepareUrl(['animals'],
      [{'projection': ANIMAL_EXCERPT}]);

    return this.httpService.getResource(url);
  }

}
