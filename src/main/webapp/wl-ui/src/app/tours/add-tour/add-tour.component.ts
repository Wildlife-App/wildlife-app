import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LocationModel} from "../../models/location.model";
import {DisplayMessageModel} from "../../models/display.message.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {HttpService} from "../../http.service";
import {MAX_DATE, MIN_DATE, ValidatorUtils} from "../../utils/validator-utils";
import {DATE_FORMAT, HOME_URI, prepareUrl} from "../../app.constants";
import {TourModel} from "../../models/tour.model";

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  private tourForm: FormGroup;
  private isRedirected = false;
  private isEditing = false;
  private selectedLocation: LocationModel;
  private displayMessage: DisplayMessageModel = DisplayMessageModel.create();
  private allLocations: LocationModel[] = [];
  private isSubmittable: boolean = false;
  private fromDatePickerConfig: Partial<BsDatepickerConfig>;
  private toDatePickerConfig: Partial<BsDatepickerConfig>;
  private currentTour: TourModel;
  private validationMessages = {
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
    },
    'safaris' : {
      'min' : 'Safari count cannot be negative.'
    }
  };
  private formErrors = {
    'selectedLocation': '',
    'fromDate': '',
    'startDate': '',
    'toDate': '',
    'endDate': '',
    'tourDuration': '',
    'safaris' : ''
  };

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private router: Router) {
    this.fromDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      isAnimated: true,
      showWeekNumbers: false,
      dateInputFormat: DATE_FORMAT,
      minDate: MIN_DATE,
      maxDate: MAX_DATE
    });
    this.buildForm();

    const fetchedLocations: LocationModel[] = this.activatedRoute.snapshot.data['locations'].content;
    fetchedLocations.forEach(fetchedLocation => this.allLocations.push(LocationModel.fromData(fetchedLocation)));

    const editingValue = this.activatedRoute.snapshot.queryParamMap.get('editing');
    if (editingValue) {
      const currentTour: TourModel = this.activatedRoute.snapshot.data['currentTour'];
      this.isEditing = true;
      this.currentTour = currentTour;
    }
  }

  private setData(): void {
    if (this.isEditing) {
      console.log('Editing a tour...');
      this.tourForm.get('tourDuration').get('fromDate').setValue(this.currentTour.startDate);
      this.updateToDateConfig();
      this.tourForm.get('tourDuration').get('toDate').setValue(this.currentTour.endDate);
      this.selectedLocation = LocationModel.fromData(this.currentTour.location);
      this.updateLocation();
    } else if (this.isRedirected) {
      console.log('Adding a tour with new location...');
      this.updateLocation();
    }
  }

  ngOnInit() {
    this.resolveRouteVariables();
    this.setData();

    this.tourForm.valueChanges.subscribe(() => {
      this.validateTourForm();
    });

    this.tourForm.get('tourDuration').get('fromDate').valueChanges.subscribe(() => {
      this.formErrors.startDate = '';
      this.formErrors.endDate = '';
      this.updateToDateConfig();
    });
  }

  private buildForm(): void {
    this.tourForm = this.formBuilder.group({
      selectedLocation: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]
      ],
      tourDuration: this.formBuilder.group({
        fromDate: ['', [Validators.required, FutureDateValidator]],
        toDate: ['', [Validators.required, FutureDateValidator]]
      }, {validator: FromAndToDateValidator}),
      safaris : [0, [Validators.min(0)]]
    });
  }

  private resolveRouteVariables() {
    const queryParamMap: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    const locationResourceId = +queryParamMap.get('resourceId');

    if (locationResourceId && locationResourceId > 0) {
      console.log('Loaded locations: ', this.allLocations);
      this.selectLocation(locationResourceId);
      this.isRedirected = true;
    } else {
      this.isRedirected = false;
      this.tourForm.get('selectedLocation').setValue('');
    }
  }

  private validateTourForm() {
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

  private selectLocation(resourceId?: number) {
    const id = resourceId ? resourceId : +this.tourForm.get('selectedLocation').value;
    for (let loc of this.allLocations) {
      if (loc.resourceId === id) {
        this.selectedLocation = loc;
        break;
      }
    }
  }

  private updateToDateConfig(): void {
    const updatedValue = this.tourForm.get('tourDuration').get('fromDate').value;
    this.setToDateConfig(updatedValue);
  }

  private setToDateConfig(fromDateStr: string): void {
    const fromDate: Date = new Date(fromDateStr);
    console.log('From DateStr:', fromDateStr);
    console.log('From Date:', fromDate);

    this.toDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: DATE_FORMAT,
      minDate: fromDate,
      maxDate: MAX_DATE
    });
    console.log('Config after set:', this.toDatePickerConfig);
  }

  private isInvalidFromDate(): boolean | null {
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

    this.setData();
  }

  saveTour() {
    const startDate = this.tourForm.get('tourDuration').get('fromDate').value;
    const endDate = this.tourForm.get('tourDuration').get('toDate').value;
    const location = this.tourForm.get('selectedLocation').value;
    const safaris = this.tourForm.get('safaris').value;
    const tour: TourModel = new TourModel(startDate, endDate, location, 0, 0, safaris);

    if(this.isEditing) {
      tour.resourceId = this.currentTour.resourceId;
      this.putData(tour);
    } else {
      this.postData(tour);
    }
  }

  private postData(tour: TourModel) {
    this.httpService.postResource(prepareUrl(['/tours']), tour).subscribe(data => {
      console.log('Tour added', data);
      this.resetForm();
      this.displayMessage.newInfoMessage('Tour created. Navigating to the summary page... ');
      this.navigate();
    }, error => {
      this.doErrorFormalities(error);
    });
  }

  private putData(tour: TourModel) {
    this.httpService.putResource(prepareUrl(['/tours', tour.resourceId.toString()]), tour).subscribe(data => {
      console.log('Tour updated', data);
      this.resetForm();
      this.displayMessage.newInfoMessage('Tour created. Navigating to the summary page... ');
      this.navigate();
    }, error => {
      this.doErrorFormalities(error);
    });
  }

  private doErrorFormalities(error): void {
    console.log('Error while saving tour', error);
    if (error.error && error.error.errorMessages) {
      const errorMessages = error.error.errorMessages;
      console.log('Error messages', errorMessages);
      for (let formErrorsKey in this.formErrors) {
        console.log('formErrorsKey: ', formErrorsKey);
        console.log('errorMessages[formErrorsKey]: ', errorMessages[formErrorsKey]);
        if (errorMessages[formErrorsKey]) {
          this.formErrors[formErrorsKey] = errorMessages[formErrorsKey][0];
        }
      }
    }
  }

  private updateLocation(): void {
    if (this.selectedLocation) {
      console.log('Selected Location: ', this.selectedLocation);
      this.isRedirected = true;
      this.tourForm.get('selectedLocation').setValue(this.selectedLocation.getSelfLink());
    }
  }

  navigate() {
    setTimeout(() => {
        this.router.navigate([HOME_URI]).finally();
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
