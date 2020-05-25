import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TourModel} from "../../models/tour.model";
import {HttpService} from "../../http.service";
import {
  FROM_ROOT,
  NEW_TOUR_EXISTING_LOCATION_URI,
  NEW_TOUR_LANDING_URI,
  prepareUrl,
  TOUR_EXCERPT, WILDLIFE_URI
} from "../../app.constants";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  readonly uriFromRoot: string = FROM_ROOT;
  readonly uriWildlife: string = WILDLIFE_URI;

  private tour: TourModel = TourModel.empty();
  private currentTourId: number = -1;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.resolveRouteVariable().finally(() => this.loadTour());
  }

  private async resolveRouteVariable() {
    await this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log('Fetched param map: ', paramMap);
      this.currentTourId = +paramMap.get('id');
    });
  }

  private loadTour() {
    const url: string = prepareUrl(['/tours', this.currentTourId.toString()],
      [{'projection': TOUR_EXCERPT}]);

    console.log('Fetching tour from: ', url);
    this.httpService.getResource(url).subscribe(data => {
      console.log('Fetched tour: ', data);
      this.tour = TourModel.fromDataForView(data);
    });
  }

  private navigateToEditTour() {
    this.router.navigate([NEW_TOUR_LANDING_URI, NEW_TOUR_EXISTING_LOCATION_URI],
      {queryParams: {'editing' : this.tour.resourceId}})
      .finally();
  }

  private navigateToAddAnimal() {
    this.router.navigate([this.uriFromRoot, this.uriWildlife],
      {'queryParams': {'tourId': this.tour.resourceId}})
      .finally();
  }
}
