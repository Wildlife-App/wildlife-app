import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {TourModel} from "../models/tour.model";
import {LinkModel} from "../models/link.model";
import {PageModel} from "../models/page.model";
import {FROM_ROOT, NEW_TOUR_LANDING_URI, prepareUrl, TOUR_URI} from "../app.constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SummaryLoaderModel} from "../models/summary-loader.model";
import {LocationModel} from "../models/location.model";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  readonly uriFromRoot: string = FROM_ROOT;
  readonly uriTour: string = TOUR_URI;

  private sortForm: FormGroup;

  private summaryList: SummaryLoaderModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private formBuilder: FormBuilder) {
  }

  private addTourIrl: string = '/' + NEW_TOUR_LANDING_URI;
  private greetingText: string;
  private userName: string = 'Arnab';

  ngOnInit() {
    this.sortForm = this.formBuilder.group({
      sortBy: [''],
      sortType: ['']
    });

    this.sortForm.get('sortBy').setValue('location');
    this.sortForm.get('sortType').setValue('asc');

    this.greeting();
    this.loadSummary();
  }

  private greeting(): void {
    const now: Date = new Date();
    const hh: number = now.getHours();

    if (hh > 0 && hh < 12) {
      this.greetingText = 'Good Morning';
    } else if (hh >= 12 && hh <= 16) {
      this.greetingText = 'Good Afternoon';
    } else {
      this.greetingText = 'Good Evening';
    }
  }

  private loadSummary(): void {
    const routeData: any = this.activatedRoute.snapshot.data['tourSummary'];
    if(routeData && routeData.content) {
      (<LocationModel[]>routeData.content).forEach(content => this.summaryList.push(SummaryLoaderModel.extractFromLocation(content)));
    }
    console.log(this.summaryList);
  }
}
