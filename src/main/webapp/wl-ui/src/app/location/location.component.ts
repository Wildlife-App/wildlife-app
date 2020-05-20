import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http.service";
import {NAME_MAX_LENGTH, NAME_MIN_LENGTH, ValidatorUtils} from "../utils/validator-utils";
import {Router} from "@angular/router";
import {StateModel} from "../models/state.model";
import {CountryModel} from "../models/country.model";
import {LocationModel} from "../models/location.model";
import {DisplayMessageModel} from "../models/display.message.model";
import {NEW_TOUR_EXISTING_LOCATION_URI, NEW_TOUR_LANDING_URI, prepareUrl} from "../app.constants";

let httpServiceInject: HttpService;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  private locationForm: FormGroup;
  private states: StateModel[] = [];
  private countries: CountryModel[] = [];
  private isSubmittable: boolean = false;
  private displayMessage: DisplayMessageModel = DisplayMessageModel.create();

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router) {
    httpServiceInject = httpService;
  }

  validationMessages = {
    'locationName': {
      'required': 'Location name is required.',
      'minlength': 'Must contain at least ' + NAME_MIN_LENGTH + ' characters.',
      'maxlength': 'Can contain maximum ' + NAME_MAX_LENGTH + ' characters.',
      'duplicateLocationName': 'This location already exists.',
      'invalidName': 'Cannot start with a number and cannot contain special characters.'
    },
    'country': {
      'required': 'Please select a country.'
    },
    'state': {
      'required': 'Please select a state.'
    },
    'area': {
      'min': 'Area cannot be negative.'
    }
  };
  formErrors = {
    'locationName': '',
    'state': '',
    'country': '',
    'area': ''
  };

  ngOnInit() {
    this.buildForm();
    this.fetchCountries();

    this.locationForm.valueChanges.subscribe(data => {
      this.displayMessage.reset();
      console.log('Value changed', data);
      this.validateForm(this.locationForm);
    });

  }

  validateForm(group: FormGroup): void {
    ValidatorUtils.validateForm(group, this.validationMessages, this.formErrors);
    this.isSubmittable = ValidatorUtils.isSubmittableForm(this.locationForm);
  }

  buildForm() {
    this.locationForm = this.formBuilder.group({
      locationName: ['', [Validators.required, Validators.minLength(NAME_MIN_LENGTH),
        Validators.maxLength(NAME_MAX_LENGTH), ValidatorUtils.NameValidator]],
      stateCountryGroup: this.formBuilder.group({
        country: ['', [Validators.required]],
        state: ['', [Validators.required]]
      }),
      area: [0.0, Validators.min(0.0)]
    });
  }

  fetchCountries() {
    this.countries.length = 0;
    this.states.length = 0;
    this.httpService.getResource(prepareUrl(['/countries'])).subscribe(data => {
      const allCountries: CountryModel[] = data.content;

      console.log('Fetched countries', allCountries);
      allCountries.forEach(country => {
        if (country.states && country.states.length > 0) {
          this.countries.push(CountryModel.fromCountry(country));
        }
      });
      this.locationForm.get('stateCountryGroup').get('country').setValue('');
      this.fetchStates();
    }, error => {
      console.log('Error while fetching countries ', error);
    });
  }

  fetchStates() {
    const countryCode: string = this.locationForm.get('stateCountryGroup').get('country').value;
    console.log('Selected countryCode: ', countryCode);
    if (countryCode === '') {
      return;
    }
    const selectedCountry: CountryModel = this.countries.find(country =>
      countryCode === country.internationalCode);
    this.states.length = 0;
    selectedCountry.states.forEach(state => this.states.push(StateModel.fromState(state)));
    this.locationForm.get('stateCountryGroup').get('state').setValue('');
    console.log('States of this country are: ', selectedCountry.states);
  }

  saveLocation() {
    const selectedState: string = this.locationForm.get('stateCountryGroup').get('state').value;
    const locationName: string = this.locationForm.get('locationName').value;
    const area: number = this.locationForm.get('area').value;
    const location: LocationModel = new LocationModel(locationName, area, selectedState);
    this.postData(location);
  }

  postData(location: LocationModel): void {
    console.log('Posting location: ', location);
    this.httpService.postResource(prepareUrl(['/locations']), location).subscribe(
      data => {
        console.log('location saved', data);
        console.log('Resetting form.');
        this.resetLocationForm();
        this.displayMessage.newInfoMessage('Location added successfully, navigating to the next page.');
        this.navigate(+data.resourceId);
      }, error => {
        console.log('Error while saving location', error);
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

  navigate(resourceId: number) {
    setTimeout(() => {
        this.router.navigate([NEW_TOUR_LANDING_URI, NEW_TOUR_EXISTING_LOCATION_URI],
          {'queryParams': {'resourceId': resourceId}})
          .finally();
      },
      3000);
  }

  resetLocationForm(): void {
    this.locationForm.reset();
    this.locationForm.get('locationName').setValue('');
    this.locationForm.get('stateCountryGroup').get('country').setValue('');
    this.locationForm.get('stateCountryGroup').get('state').setValue('');
    this.locationForm.get('area').setValue(0);
  }

  get LocationForm() {
    return this.locationForm;
  }
}

