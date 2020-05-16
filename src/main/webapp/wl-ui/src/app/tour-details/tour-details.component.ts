import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TourModel} from "../models/tour.model";
import {HttpService} from "../http.service";
import {formatUrl} from "../app.component";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  private tour: TourModel = TourModel.empty();
  private currentTourId: number = -1;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) {
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
    const url: string = formatUrl('/tours/' + this.currentTourId);
    console.log('Fetching tour from: ', url);
    this.httpService.getResource(url).subscribe(data => {
      console.log('Fetched tour: ', data);
      this.tour = TourModel.fromDataForView(data);
    });
  }
}
