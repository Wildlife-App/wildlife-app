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
import {AnimalModel} from "../../models/animal.model";

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
  private spottedAnimals: AnimalModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.resolveRouteVariable();
  }

  private resolveRouteVariable() {
    const currentTourData: any = this.activatedRoute.snapshot.data['tourDetails'];
    this.tour = TourModel.fromDataForView(currentTourData);

    const spottedAnimalsData: any = this.activatedRoute.snapshot.data['spottedAnimals'];

    if (spottedAnimalsData && spottedAnimalsData.content && spottedAnimalsData.content.length > 0) {
      (<AnimalModel[]>spottedAnimalsData.content).forEach(data => {
        this.spottedAnimals.push(AnimalModel.fromData(data));
      });
    }

    console.log('This spottedAnimals', this.spottedAnimals);
  }

  private navigateToEditTour() {
    this.router.navigate([NEW_TOUR_LANDING_URI, NEW_TOUR_EXISTING_LOCATION_URI],
      {queryParams: {'editing': this.tour.resourceId}})
      .finally();
  }

  private navigateToAddAnimal() {
    this.router.navigate([this.uriFromRoot, this.uriWildlife],
      {'queryParams': {'tourId': this.tour.resourceId}})
      .finally();
  }
}
