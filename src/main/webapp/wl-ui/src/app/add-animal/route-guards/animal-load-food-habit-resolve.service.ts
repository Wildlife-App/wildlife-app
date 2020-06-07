import {Injectable} from "@angular/core";
import {FoodHabitModel} from "../../models/food-habit.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {HttpService} from "../../http.service";
import {prepareUrl} from "../../app.constants";

@Injectable()
export class AnimalLoadFoodHabitResolveService implements Resolve<FoodHabitModel[]> {
  constructor(private httpService: HttpService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FoodHabitModel[]> {
    return this.httpService.getResource(prepareUrl(['foodHabits']));
  }

}
