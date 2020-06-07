import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AnimalTypeModel} from "../../models/animal-type.model";
import {Observable} from "rxjs";
import {HttpService} from "../../http.service";
import {prepareUrl} from "../../app.constants";

@Injectable()
export class AnimalLoadAnimalTypeResolveService implements Resolve<AnimalTypeModel[]> {
  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnimalTypeModel[]> {
    return this.httpService.getResource(prepareUrl(['animalType']));
  }

}
