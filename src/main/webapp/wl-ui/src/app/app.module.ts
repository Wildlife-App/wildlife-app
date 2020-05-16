import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { SummaryComponent } from './summary/summary.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { LocationComponent } from './location/location.component';
import {SimpleNotificationsModule} from "angular2-notifications";
import { NewLocationDetailsComponent } from './new-location-details/new-location-details.component';
import { TourComponent } from './tour/tour.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { FormTesterComponent } from './form-tester/form-tester.component';
import {HttpService} from "./http.service";
import { MessageComponent } from './message/message.component';
import {CanDeactivateNewPlaceService} from "./route-guards/can-deactivate-new-place.service";
import { PosterComponent } from './poster/poster.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponent,
    AddAnimalComponent,
    LocationComponent,
    NewLocationDetailsComponent,
    TourComponent,
    FormTesterComponent,
    MessageComponent,
    PosterComponent,
    TourDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    HttpService, CanDeactivateNewPlaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
