import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ExistenceStatusModel} from "../models/existence-status.model";
import {Observable} from "rxjs";
import {HttpService} from "../http.service";
import {prepareUrl} from "../app.constants";

@Injectable()
export class AnimalLoadExistenceStatusResolveService implements Resolve<ExistenceStatusModel[]> {
  constructor(private httpService: HttpService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExistenceStatusModel[]> {
    return this.httpService.getResource(prepareUrl(['existences']));
  }

}
