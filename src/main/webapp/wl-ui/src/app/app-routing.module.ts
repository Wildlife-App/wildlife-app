import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SummaryComponent} from "./summary/summary.component";
import {AddAnimalComponent} from "./add-animal/add-animal.component";
import {LocationComponent} from "./location/location.component";
import {NewLocationDetailsComponent} from "./new-location-details/new-location-details.component";
import {TourComponent} from "./tour/tour.component";
import {CanDeactivateNewPlaceService} from "./route-guards/can-deactivate-new-place.service";
import {PosterComponent} from "./poster/poster.component";

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent
  },
  {
    path: 'home',
    component: SummaryComponent
  },
  {
    path: 'add',
    component: AddAnimalComponent
  },
  {
    path: 'locations',
    component: LocationComponent
  },
  {
    path: 'newtour',
    component: NewLocationDetailsComponent,
    children: [
      {
        path: '',
        component: PosterComponent
      },
      {
        path: 'newlocation',
        component: LocationComponent,
        canDeactivate: [CanDeactivateNewPlaceService]
      },
      {
        path: 'existing',
        component: TourComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
