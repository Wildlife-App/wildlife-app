import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from './navbar/navbar.component';
import {SummaryComponent} from './summary/summary.component';
import {AddAnimalComponent} from './add-animal/add-animal.component';
import {LocationComponent} from './location/location.component';
import {SimpleNotificationsModule} from "angular2-notifications";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormTesterComponent} from './form-tester/form-tester.component';
import {HttpService} from "./http.service";
import {MessageComponent} from './message/message.component';
import {CanDeactivateNewPlaceService} from "./route-guards/can-deactivate-new-place.service";
import {PosterComponent} from './poster/poster.component';
import {ErrorComponent} from './error/error.component';
import {TourSelectLocationComponent} from "./tours/tour-select-location/tour-select-location.component";
import {TourDetailsComponent} from "./tours/tour-details/tour-details.component";
import {AddTourComponent} from "./tours/add-tour/add-tour.component";
import {EditTourResolveRouteGuardService} from "./route-guards/edit-tour-resolve-route-guard.service";
import {AddTourLocationsResolveRouteGuardService} from "./tours/add-tour/route-guards/add-tour-locations-resolve-route-guard.service";
import {AnimalLoadAnimalTypeResolveService} from "./add-animal/route-guards/animal-load-animal-type-resolve.service";
import {AnimalLoadExistenceStatusResolveService} from "./add-animal/route-guards/animal-load-existence-status-resolve.service";
import {AnimalLoadFoodHabitResolveService} from "./add-animal/route-guards/animal-load-food-habit-resolve.service";
import {CanDeactivateAnimalComponentService} from "./add-animal/route-guards/can-deactivate-animal-component.service";
import {AnimalLoadTourResolveService} from "./add-animal/route-guards/animal-load-tour-resolve.service";
import {AnimalLoadAllAnimalsResolveService} from "./add-animal/route-guards/animal-load-all-animals-resolve.service";
import {TourDetailsTourResolverService} from "./tours/tour-details/route-guards/tour-details-tour-resolver.service";
import {SummaryLoadToursResolveService} from "./summary/route-guards/summary-load-tours-resolve.service";
import {TourDetailsSpottedAnimalsResolverService} from "./tours/tour-details/route-guards/tour-details-spotted-animals-resolver.service";
import {AnimalLoadSpottedAnimalsResolveService} from "./add-animal/route-guards/animal-load-spotted-animals-resolve.service";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponent,
    AddAnimalComponent,
    LocationComponent,
    AddTourComponent,
    FormTesterComponent,
    MessageComponent,
    PosterComponent,
    TourDetailsComponent,
    ErrorComponent,
    TourSelectLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    HttpService,
    CanDeactivateNewPlaceService,
    EditTourResolveRouteGuardService,
    AddTourLocationsResolveRouteGuardService,

    AnimalLoadAnimalTypeResolveService,
    AnimalLoadFoodHabitResolveService,
    AnimalLoadExistenceStatusResolveService,
    CanDeactivateAnimalComponentService,
    AnimalLoadTourResolveService,
    AnimalLoadSpottedAnimalsResolveService,
    AnimalLoadAllAnimalsResolveService,

    TourDetailsTourResolverService,
    TourDetailsSpottedAnimalsResolverService,
    SummaryLoadToursResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
