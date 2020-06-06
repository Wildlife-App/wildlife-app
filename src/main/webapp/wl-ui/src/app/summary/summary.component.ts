import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SummaryResponseModel} from "../models/summary-response.model";
import {prepareUrl} from "../app.constants";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  // readonly uriFromRoot: string = FROM_ROOT;
  // readonly uriTour: string = TOUR_URI;

  private sortForm: FormGroup;

  private summaryResponse: SummaryResponseModel;

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private formBuilder: FormBuilder) {
  }

  // private addTourUrl: string = '/' + NEW_TOUR_LANDING_URI;
  private greetingText: string;
  private userName: string = 'Arnab';

  ngOnInit() {
    this.sortForm = this.formBuilder.group({
      sortBy: ['']
    });

    this.sortForm.get('sortBy').setValue('location');

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
    this.loadSummaryResponse(routeData);
  }

  private groupData() {
    const groupBy = this.sortForm.get('sortBy').value;

    this.httpService.getResource(prepareUrl(['summary'], [{'groupBy': groupBy}])).subscribe(data => {
      this.loadSummaryResponse(data);
    }, error => {
      console.log('Cannot load summary data.', error);
    });
  }

  private loadSummaryResponse(data: SummaryResponseModel): void {
    if (data) {
      this.summaryResponse = SummaryResponseModel.fromData(data);
    }
    console.log('summaryResponse >>> ', this.summaryResponse);
  }
}
