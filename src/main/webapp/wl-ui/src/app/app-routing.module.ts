import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from "./summary/summary.component";
import {AddAnimalComponent} from "./add-animal/add-animal.component";
import {LocationComponent} from "./location/location.component";
import {CanDeactivateNewPlaceService} from "./route-guards/can-deactivate-new-place.service";
import {PosterComponent} from "./poster/poster.component";
import {ErrorComponent} from "./error/error.component";
import {
  HOME_URI,
  LOCATIONS_URI,
  NEW_TOUR_EXISTING_LOCATION_URI,
  NEW_TOUR_LANDING_URI,
  NEW_TOUR_NEW_LOCATION_URI,
  ROOT_URI,
  TOUR_DETAILS_URI,
  WILDCARD_URI,
  WILDLIFE_URI
} from "./app.constants";
import {TourDetailsComponent} from "./tours/tour-details/tour-details.component";
import {TourSelectLocationComponent} from "./tours/tour-select-location/tour-select-location.component";
import {AddTourComponent} from "./tours/add-tour/add-tour.component";
import {AddTourLocationsResolveRouteGuardService} from "./route-guards/add-tour-locations-resolve-route-guard.service";
import {EditTourResolveRouteGuardService} from "./route-guards/edit-tour-resolve-route-guard.service";
import {AnimalLoadAnimalTypeResolveService} from "./route-guards/animal-load-animal-type-resolve.service";
import {AnimalLoadFoodHabitResolveService} from "./route-guards/animal-load-food-habit-resolve.service";
import {AnimalLoadExistenceStatusResolveService} from "./route-guards/animal-load-existence-status-resolve.service";
import {CanDeactivateAnimalComponentService} from "./route-guards/can-deactivate-animal-component.service";
import {AnimalLoadTourResolveService} from "./route-guards/animal-load-tour-resolve.service";
import {AnimalLoadAllAnimalsResolveService} from "./route-guards/animal-load-all-animals-resolve.service";
import {TourDetailsTourResolverService} from "./tours/tour-details/route-guards/tour-details-tour-resolver.service";
import {TourDetailsSpottedAnimalsResolverService} from "./tours/tour-details/route-guards/tour-details-spotted-animals-resolver.service";

const routes: Routes = [
  {
    path: ROOT_URI,
    component: SummaryComponent
  },
  {
    path: HOME_URI,
    component: SummaryComponent
  },
  {
    path: TOUR_DETAILS_URI,
    component: TourDetailsComponent,
    resolve: {
      tourDetails: TourDetailsTourResolverService,
      spottedAnimals: TourDetailsSpottedAnimalsResolverService
    }
  },
  {
    path: WILDLIFE_URI,
    component: AddAnimalComponent,
    resolve: {
      allAnimals: AnimalLoadAllAnimalsResolveService,
      animalTypes: AnimalLoadAnimalTypeResolveService,
      foodHabits: AnimalLoadFoodHabitResolveService,
      existenceStatuses: AnimalLoadExistenceStatusResolveService,
      tour: AnimalLoadTourResolveService
    },
    canDeactivate: [CanDeactivateAnimalComponentService]
  },
  {
    path: LOCATIONS_URI,
    component: LocationComponent
  },
  {
    path: NEW_TOUR_LANDING_URI,
    component: TourSelectLocationComponent,
    children: [
      {
        path: ROOT_URI,
        component: PosterComponent
      },
      {
        path: NEW_TOUR_NEW_LOCATION_URI,
        component: LocationComponent,
        canDeactivate: [CanDeactivateNewPlaceService]
      },
      {
        path: NEW_TOUR_EXISTING_LOCATION_URI,
        component: AddTourComponent,
        resolve: {
          locations: AddTourLocationsResolveRouteGuardService,
          currentTour: EditTourResolveRouteGuardService
        }
      }
    ]
  },
  {
    path: WILDCARD_URI,
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
