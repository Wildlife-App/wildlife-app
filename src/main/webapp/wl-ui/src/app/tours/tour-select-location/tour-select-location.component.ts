import {Component} from '@angular/core';
import {NEW_TOUR_EXISTING_LOCATION_URI, NEW_TOUR_NEW_LOCATION_URI} from "../../app.constants";

@Component({
  selector: 'app-tour-select-location',
  templateUrl: './tour-select-location.component.html',
  styleUrls: ['./tour-select-location.component.css']
})
export class TourSelectLocationComponent {

  private newLocationURI: string = NEW_TOUR_NEW_LOCATION_URI;
  private existingLocationURI: string = NEW_TOUR_EXISTING_LOCATION_URI;

}
