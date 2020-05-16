import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../http.service";
import {LocationModel} from "../models/location.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {MAX_DATE, MIN_DATE, ValidatorUtils} from "../utils/validator-utils";
import {DisplayMessageModel} from "../models/display.message.model";
import {TourModel} from "../models/tour.model";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  private tourForm: FormGroup;
  private isRedirected = false;
  private selectedLocation: LocationModel;
  private displayMessage: DisplayMessageModel = DisplayMessageModel.create();
  private allLocations: LocationModel[] = new Array<LocationModel>();
  private isSubmittable: boolean = false;
  validationMessages = {
    'selectedLocation': {
      'required': 'Location name is required.',
      'minlength': 'Must contain at least 3 characters.',
      'maxlength': 'Can contain maximum 40 characters.',
      'duplicateLocationName': 'This location is already added.'
    },
    'fromDate': {
      'required': 'Start date is required.',
      'bsDate': 'Please enter a valid date.',
      'futureDate': 'Start date cannot be future date.'
    },
    'toDate': {
      'required': 'End date is required.',
      'bsDate': 'Please enter a valid date.',
      'futureDate': 'End date cannot be future date.'
    },
    'tourDuration': {
      'toDateGreaterThanFromDate': 'End date cannot be earlier than start date.',
    }
  };
  formErrors = {
    'selectedLocation': '',
    'fromDate': '',
    'toDate': '',
    'tourDuration': ''
  };
  private fromDatePickerConfig: Partial<BsDatepickerConfig>;
  private toDatePickerConfig: Partial<BsDatepickerConfig>;


  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private router: Router) {
    this.fromDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      isAnimated: true,
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      minDate: MIN_DATE,
      maxDate: MAX_DATE
    });
  }

  ngOnInit() {
    this.buildForm();
    this.loadLocations().finally(() => {
      this.resolveRouteVariable();
    });

    this.tourForm.valueChanges.subscribe(() => {
      this.validateTourForm();
    });

    this.tourForm.get('tourDuration').get('fromDate').valueChanges.subscribe(() => {
      const updatedValue = this.tourForm.get('tourDuration').get('fromDate').value;
      this.setToDateConfig(updatedValue);
    });
  }

  buildForm(): void {
    this.tourForm = this.formBuilder.group({
      selectedLocation: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]
      ],
      tourDuration: this.formBuilder.group({
        fromDate: ['', [Validators.required, FutureDateValidator]],
        toDate: ['', [Validators.required, FutureDateValidator]]
      }, {validator: FromAndToDateValidator})
    });
  }

  async loadLocations(): Promise<void> {
    await this.httpService.get('/locations').toPromise().then(data => {
      console.log('Fetched locations', data);
      data.content.forEach(item => {
        this.allLocations.push(LocationModel.fromData(item));
      });
      console.log('Loaded locations', this.allLocations);
    }).catch(error => {
      console.log('Error fetching locations', error);
    }).finally(() => {
      console.log('Locations loaded..')
    });
  }

  resolveRouteVariable() {
    this.activatedRoute.queryParams.subscribe(params => {
      const resourceId = +params['resourceId'];
      console.log('Params value', params, resourceId);
      if (resourceId && resourceId > 0) {
        console.log('Loaded locations: ', this.allLocations);
        this.selectLocation(resourceId);

        if (this.selectedLocation) {
          console.log('Selected Location: ', this.selectedLocation);
          this.isRedirected = true;
          this.tourForm.get('selectedLocation').setValue(this.selectedLocation.getSelfLink());
        }
      } else {
        this.isRedirected = false;
        this.tourForm.get('selectedLocation').setValue('');
      }
    });
  }

  validateTourForm() {
    this.isSubmittable = true;
    ValidatorUtils.validateForm(this.tourForm, this.validationMessages, this.formErrors);
    if (!this.tourForm.touched || this.tourForm.pristine) {
      this.isSubmittable = false;
      console.log('Invalid form!! Not touched or pristine');
    }
    if (this.tourForm.dirty && !this.tourForm.valid) {
      this.isSubmittable = false;
      console.log('Invalid form!! Not Valid');
    }
  }

  selectLocation(resourceId?: number) {
    const id = resourceId ? resourceId : +this.tourForm.get('selectedLocation').value;
    for (let loc of this.allLocations) {
      if (loc.resourceId === id) {
        this.selectedLocation = loc;
        break;
      }
    }
  }

  setToDateConfig(fromDateStr: string): void {
    const fromDate: Date = new Date(fromDateStr);
    console.log('From DateStr:', fromDateStr);
    console.log('From Date:', fromDate);

    this.toDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      minDate: fromDate,
      maxDate: MAX_DATE
    });
    console.log('Config after set:', this.toDatePickerConfig);
  }

  isInvalidFromDate(): boolean | null {
    const control: AbstractControl = this.tourForm.get('tourDuration').get('fromDate');
    const fromDate: Date = new Date(control.value);
    if (fromDate && fromDate.getDay() > 0 && control.valid) {
      return null;
    }
    return true;
  }

  resetForm(): void {
    this.tourForm.reset();
    this.tourForm.get('selectedLocation').setValue('');
    this.isRedirected = false;
    this.selectedLocation = undefined;
  }

  saveTour() {
    const startDate = this.tourForm.get('tourDuration').get('fromDate').value;
    const endDate = this.tourForm.get('tourDuration').get('toDate').value;
    const location = this.tourForm.get('selectedLocation').value;
    const tour: TourModel = new TourModel(startDate, endDate, location);
    this.postData(tour);
  }

  private postData(tour: TourModel) {
    this.httpService.post('/tours', tour).subscribe(data => {
      console.log('Tour added', data);
      this.resetForm();
      this.displayMessage.newInfoMessage('Tour created. Navigating to the summary page... ');
      this.navigate();
    }, error => {
      console.log('Error while saving tour', error);
      if (error.error && error.error.errorMessages) {
        const errorMessages = error.error.errorMessages;
        console.log('Error messages', errorMessages);
        for (let formErrorsKey in this.formErrors) {
          if (errorMessages[formErrorsKey]) {
            this.formErrors[formErrorsKey] = errorMessages[formErrorsKey][0];
          }
        }
      }
    });
  }

  navigate() {
    setTimeout(() => {
        this.router.navigate(['/home']).finally();
      },
      3000);
  }
}

function FromAndToDateValidator(control: AbstractControl): { [key: string]: any } {
  const fromDate: Date = new Date(control.get('fromDate').value);
  const toDate: Date = new Date(control.get('toDate').value);
  console.log('fromDate:', fromDate);
  console.log('toDate:', toDate);
  if (toDate < fromDate) {
    console.log('toDate is less than from date');
    return {'toDateGreaterThanFromDate': true};
  }
  return null;
}

function FutureDateValidator(control: AbstractControl): { [key: string]: any } {
  const dateVal = control.value;
  console.log('Entered date', dateVal);

  if (!dateVal || dateVal === '') {
    return null;
  }
  const date: Date = new Date(dateVal);
  if (date > MAX_DATE) {
    console.log('Future to date entered');
    return {'futureDate': true};
  }
  return null;
}
