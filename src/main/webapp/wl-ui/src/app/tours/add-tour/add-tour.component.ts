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
import {parseDate} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  readonly currentTour: TourModel;
  private tourForm: FormGroup;

  private isEditing = false;
  private isRedirected = false;
  private selectedLocation: LocationModel;
  private displayMessage: DisplayMessageModel = DisplayMessageModel.create();
  private allLocations: LocationModel[] = [];
  private isSubmittable: boolean = false;
  private fromDatePickerConfig: Partial<BsDatepickerConfig>;
  private toDatePickerConfig: Partial<BsDatepickerConfig>;

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
    'safaris': {
      'min': 'Safari count cannot be negative.'
    }
  };
  private formErrors = {
    'selectedLocation': '',
    'fromDate': '',
    'startDate': '',
    'toDate': '',
    'endDate': '',
    'tourDuration': '',
    'safaris': ''
  };

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private router: Router) {

    this.setFromDateConfig();
    this.setInitialToDateConfig();
    this.buildForm();
    this.loadLocations();

    const editingValue = this.activatedRoute.snapshot.queryParamMap.get('editing');
    if (editingValue) {
      const loadedTour: TourModel = this.activatedRoute.snapshot.data['currentTour'];
      console.log('loadedTour >>>>>  ', loadedTour);
      const currentTour: TourModel = TourModel.fromDataForView(loadedTour);
      this.isEditing = true;
      this.currentTour = currentTour;
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
      safaris: [0, [Validators.min(0)]]
    });
  }

  private loadLocations(): void {
    const routeData: any = this.activatedRoute.snapshot.data['locations'];
    if (routeData && routeData.page && routeData.page.totalElements > 0) {
      const fetchedLocations: LocationModel[] = this.activatedRoute.snapshot.data['locations'].content;
      fetchedLocations.forEach(fetchedLocation => this.allLocations.push(LocationModel.fromData(fetchedLocation)));
    }
  }

  private setData(): void {
    if (this.isEditing) {
      this.tourForm.get('tourDuration').get('fromDate').setValue(parseDate(this.currentTour.startDate, DATE_FORMAT));
      this.updateToDateConfig();

      this.tourForm.get('tourDuration').get('toDate').setValue(parseDate(this.currentTour.endDate, DATE_FORMAT));

      this.selectedLocation = LocationModel.fromData(<LocationModel>this.currentTour.location);
      this.updateLocation();
      this.tourForm.get('safaris').setValue(this.currentTour.safaris);
    } else if (this.isRedirected) {
      console.log('Adding a tour with new location...');
      this.updateLocation();
    }
  }

  private resolveRouteVariables() {
    const queryParamMap: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    const locationResourceId = +queryParamMap.get('resourceId');

    if (locationResourceId && locationResourceId > 0) {
      this.selectLocation(locationResourceId);
      this.isRedirected = true;
    } else {
      this.isRedirected = false;
      this.tourForm.get('selectedLocation').setValue('');
    }
  }

  private validateTourForm() {
    ValidatorUtils.validateForm(this.tourForm, this.validationMessages, this.formErrors);
    if (!this.tourForm.touched || this.tourForm.pristine) {
      this.isSubmittable = false;
      console.log('Invalid form!! Not touched or pristine');
    } else {
      this.isSubmittable = true;
    }
    if (this.tourForm.dirty && !this.tourForm.valid) {
      this.isSubmittable = false;
      console.log('Invalid form!! Not Valid');
    } else {
      this.isSubmittable = true;
    }
    // Value check if on edit screen
    if (this.isEditing) {
      const formStartDate: Date = this.tourForm.get('tourDuration').get('fromDate').value;
      const formEndDate: Date = this.tourForm.get('tourDuration').get('toDate').value;
      const formSafaris: number = this.tourForm.get('safaris').value;
      const formLocation: LocationModel = this.tourForm.get('selectedLocation').value;

      this.isSubmittable = !this.currentTour.equals(new TourModel(formStartDate, formEndDate, formLocation,
        0, 0, formSafaris));
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
    this.setToDateFromFromDate();
  }

  private setFromDateConfig(): void {
    this.fromDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      isAnimated: true,
      showWeekNumbers: false,
      dateInputFormat: DATE_FORMAT,
      minDate: MIN_DATE,
      maxDate: MAX_DATE
    });
  }

  private setInitialToDateConfig() {
    this.toDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: DATE_FORMAT
    });
  }

  private setToDateConfig(fromDate: Date): void {
    this.toDatePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: DATE_FORMAT,
      minDate: fromDate,
      maxDate: MAX_DATE
    });
  }

  private setToDateFromFromDate(): void {
    const fromDate = this.tourForm.get('tourDuration').get('fromDate').value;
    const toDate: Date = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1);
    this.tourForm.get('tourDuration').get('toDate').setValue(toDate);
  }

  private isInvalidFromDate(): boolean | null {
    const control: AbstractControl = this.tourForm.get('tourDuration').get('fromDate');
    const fromDate: Date = new Date(control.value);
    if (fromDate && fromDate.getDate() > 0 && control.valid) {
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

    if (this.isEditing) {
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
  if (toDate < fromDate) {
    return {'toDateGreaterThanFromDate': true};
  }
  return null;
}

function FutureDateValidator(control: AbstractControl): { [key: string]: any } {
  const dateVal = control.value;
  if (!dateVal || dateVal === '') {
    return null;
  }
  const date: Date = new Date(dateVal);
  if (date > MAX_DATE) {
    return {'futureDate': true};
  }
  return null;
}
