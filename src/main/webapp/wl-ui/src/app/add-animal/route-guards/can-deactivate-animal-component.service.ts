import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {AddAnimalComponent} from "../add-animal.component";

@Injectable()
export class CanDeactivateAnimalComponentService implements CanDeactivate<AddAnimalComponent> {
  canDeactivate(component: AddAnimalComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (component.AnimalForm.dirty) {
      return confirm('Are you sure you want to navigate away from this page?');
    }

    return true;
  }


}
