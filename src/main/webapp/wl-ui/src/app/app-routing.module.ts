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
    component: TourDetailsComponent
  },
  {
    path: WILDLIFE_URI,
    component: AddAnimalComponent
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
