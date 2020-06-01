import {Injectable} from "@angular/core";
import {SummaryComponent} from "../summary.component";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {prepareUrl} from "../../app.constants";
import {HttpService} from "../../http.service";

@Injectable()
export class SummaryLoadToursResolveService implements Resolve<SummaryComponent> {
  constructor(private httpService: HttpService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SummaryComponent> {
    return this.httpService.getResource(prepareUrl(['locations', 'search', 'hasTours']));
  }

}
