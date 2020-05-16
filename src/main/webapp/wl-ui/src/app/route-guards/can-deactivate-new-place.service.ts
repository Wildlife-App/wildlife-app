import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {LocationComponent} from "../location/location.component";
import {Injectable} from "@angular/core";

@Injectable()
export class CanDeactivateNewPlaceService implements CanDeactivate<LocationComponent> {

  canDeactivate(component: LocationComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot): boolean {
    if(component.LocationForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;;
  }

}
