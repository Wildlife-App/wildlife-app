import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorUtils} from "../utils/validator-utils";
import {HttpService} from "../http.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DATE_FORMAT, prepareUrl} from "../app.constants";
import {ActivatedRoute} from "@angular/router";
import {AnimalTypeModel} from "../models/animal-type.model";
import {FoodHabitModel} from "../models/food-habit.model";
import {ExistenceStatusModel} from "../models/existence-status.model";
import {AnimalModel} from "../models/animal.model";
import {TourModel} from "../models/tour.model";
import {LocationModel} from "../models/location.model";

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  private readonly defaultFormTitleText: string = 'Add an animal';
  private datePickerConfig: Partial<BsDatepickerConfig>;
  private animalForm: FormGroup;
  private foodHabitList: FoodHabitModel[] = [];
  private animalTypeList: AnimalTypeModel[] = [];
  private existenceStatusList: ExistenceStatusModel[] = [];
  private currentAnimal: AnimalModel = AnimalModel.createEmpty();
  private formTitleText: string = this.defaultFormTitleText;
  private fileToBeUploaded: File;
  private imgUrl: string;
  private uploadStatus: 'success' | 'fail';
  private uploadInProgress: boolean;
  private recordTypeSelectorForm: FormGroup;
  private animalDropDownForm: FormGroup;
  private allAnimals: AnimalModel[] = [];
  private showDropdown: boolean;
  private showForm: boolean;
  private currentTour: TourModel;
  private linking: boolean;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute) {
    this.configDate();
    this.fetchAnimalTypes();
    this.fetchFoodHabitTypes();
    this.fetchExistenceStatus();
    this.buildForm();
  }

  private validationMessages = {
    'animalName': {
      'required': 'Animal name is required.',
      'minlength': 'Must contain at least 3 characters.',
      'maxlength': 'Can contain maximum 40 characters.',
      'duplicateAnimalName': 'This animal is already added.'
    },
    'scientificName': {
      'required': 'Scientific name is required.',
      'minlength': 'Must contain at least 3 characters.',
      'maxlength': 'Can contain maximum 40 characters.',
      'duplicateScientificName': 'This animal is already added.'
    },
    'foodHabit': {
      'required': 'Please select food habit.'
    },
    'animalType': {
      'required': 'Please select the type.'
    },
    'existenceStatus': {
      'required': 'Please select the existence.'
    },
    'gender': {
      'required': 'Please select the gender.'
    },
    'spottingDate': {
      'required': 'A valid date is required.',
      'valid': 'Invalid date.'
    },
    'imageLink': {
      'invalidFileExt': 'Please upload only .jpg file.'
    }
  };
  private formErrors = {
    'animalName': '',
    'scientificName': '',
    'foodHabit': '',
    'animalType': '',
    'existenceStatus': '',
    'gender': '',
    'imageLink': ''
  };

  ngOnInit() {
    this.fetchAllAnimals();
    this.resolveTourIfExists();

    this.animalForm.valueChanges.subscribe(data => {
      console.log('Value changed', data);
      this.validateForm(this.animalForm);
    });

    this.recordTypeSelectorForm.valueChanges.subscribe(data => {
      console.log('Data = ', data);
      this.toggleForm();

      if (data['recordTypeSelector'] === 'new') {
        this.resetForm();
        this.linking = false;
      } else {
        this.animalDropDownForm.get('selectedAnimal').setValue('-1');
      }
    });

    this.animalDropDownForm.valueChanges.subscribe(data => {
      console.log('Data = ', data);
      this.loadAnimalForLink();
    });
  }

  private buildForm(): void {
    this.animalForm = this.formBuilder.group({
      animalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      scientificName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      gender: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      animalType: ['', [Validators.required]],
      foodHabit: ['', [Validators.required]],
      existenceStatus: ['', [Validators.required]],
      imageLink: ['', validateUploadedImage]
    });

    this.recordTypeSelectorForm = this.formBuilder.group({
      recordTypeSelector: ['']
    });

    this.animalDropDownForm = this.formBuilder.group({
      selectedAnimal: ['']
    });
    this.animalDropDownForm.get('selectedAnimal').setValue('-1');
  }

  private configDate(): void {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: DATE_FORMAT,
      minDate: new Date(2015, 0, 1),
      maxDate: new Date()
    });
  }

  private validateForm(group: FormGroup): void {
    ValidatorUtils.validateForm(group, this.validationMessages, this.formErrors);
  }

  private resolveTourIfExists(): void {
    const routeData: any = this.activatedRoute.snapshot.data['tour'];
    console.log('resolveTourIfExists :: ', routeData);
    if (routeData) {
      const tour: TourModel = TourModel.fromDataForView(routeData);
      console.log('Adding animal for tour', tour);
      let location: LocationModel;
      if (tour.location instanceof LocationModel) {
        location = <LocationModel>tour.location;
        this.formTitleText = 'New spotted animal at ' + location.locationName
          + ' (' + tour.startDate + ' to ' + tour.endDate + ')';

        this.currentTour = tour;
      }
    } else {
      this.formTitleText = this.defaultFormTitleText;
    }

  }

  private fetchAllAnimals(): void {
    const allAnimalData: any = this.activatedRoute.snapshot.data['allAnimals'];
    console.log('allAnimalData fetched', allAnimalData);
    if (AddAnimalComponent.hasContent(allAnimalData)) {
      (<AnimalModel[]>allAnimalData.content).forEach(animal => this.allAnimals.push(AnimalModel.fromData(animal)));
    }
  }

  private fetchAnimalTypes() {
    const routeData: any = this.activatedRoute.snapshot.data['animalTypes'];
    if (AddAnimalComponent.hasContent(routeData)) {
      (<AnimalTypeModel[]>routeData.content).forEach(type => {
        this.animalTypeList.push(AnimalTypeModel.fromData(type));
      });
    }
  }

  private fetchFoodHabitTypes() {
    const routeData: any = this.activatedRoute.snapshot.data['foodHabits'];
    if (routeData && routeData.page && routeData.page.totalElements > 0) {
      (<FoodHabitModel[]>routeData.content).forEach(type => {
        this.foodHabitList.push(FoodHabitModel.fromData(type));
      });
    }
  }

  private fetchExistenceStatus() {
    const routeData: any = this.activatedRoute.snapshot.data['existenceStatuses'];
    if (routeData && routeData.page && routeData.page.totalElements > 0) {
      (<ExistenceStatusModel[]>routeData.content).forEach(type => {
        this.existenceStatusList.push(ExistenceStatusModel.fromData(type));
      });
    }
  }

  private fetchData(url: string, list: any[]) {
    this.httpService.getResource(prepareUrl([url])).subscribe(data => {
      console.log('Fetched data', data);
      for (let a of data.content) {
        list.push(a);
      }
    }, error => {
      console.log('error', error);
    });
  }

  prepareAnimalObjectForSave(): void {
    this.currentAnimal.animalName = this.animalForm.get('animalName').value;
    this.currentAnimal.scientificName = this.animalForm.get('scientificName').value;
    this.currentAnimal.animalGender = this.animalForm.get('gender').value;
    this.currentAnimal.animalType = this.animalForm.get('animalType').value;
    this.currentAnimal.existenceStatus = this.animalForm.get('existenceStatus').value;
    this.currentAnimal.foodHabitType = this.animalForm.get('foodHabit').value;
    this.currentAnimal.addLocation((<LocationModel>this.currentTour.location).getSelfLink());
    this.currentAnimal.addTour(this.currentTour.getSelfLink());
    const imageLink = this.animalForm.get('imageLink').value;
    console.log('imageLink-------', imageLink);
    console.log('Posting data', this.currentAnimal);

    this.resetForm();
  }

  private saveAnimal() {
    this.prepareAnimalObjectForSave();

    this.httpService.postResource(prepareUrl(['animals']), this.currentAnimal).subscribe(data => {
      console.log('Saved animal', data);
    }, error => {
      console.log('Error occurred', error);
    });
  }

  private resolveClass(selector: string): string {
    const control: AbstractControl = this.animalForm.get(selector);
    if (control && control.value) {
      return 'text';
    } else {
      return 'placeholder-text';
    }
  }

  private resetForm(): void {
    this.animalForm.reset();

    this.animalForm.get('animalName').setValue('');
    this.animalForm.get('scientificName').setValue('');
    this.animalForm.get('gender').setValue('');
    this.animalForm.get('animalType').setValue('');
    this.animalForm.get('foodHabit').setValue('');
    this.animalForm.get('existenceStatus').setValue('');

    this.fileToBeUploaded = undefined;
    this.imgUrl = undefined;
    this.uploadStatus = undefined;
  }

  private selectImage(event): void {
    this.fileToBeUploaded = event.target.files[0];
    console.log('Val = ', this.fileToBeUploaded);
    const mimeType = this.fileToBeUploaded.type;

    if (mimeType.match(/image\/*/)) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToBeUploaded);
      reader.onload = (_event) => {
        this.imgUrl = <string>reader.result;
      }
    }
  }

  private uploadImage(): void {
    if (!this.fileToBeUploaded) {
      console.log('Nothing to be uploaded');
      return;
    }
    this.animalForm.get('imageLink').setValue('');
    const formData = new FormData();
    formData.append('file', this.fileToBeUploaded, this.fileToBeUploaded.name);
    this.uploadInProgress = true;
    this.httpService.postResource(prepareUrl(['upload']), formData).subscribe(data => {
      this.uploadStatus = 'success';
      this.currentAnimal.addResourceImage(data.id, data.fullUrl, this.currentTour.tourId);
      console.log('currentAnimal ', this.currentAnimal);

    }, error => {
      console.log('Error = ', error);
      this.uploadStatus = 'fail';
    }, () => {
      this.fileToBeUploaded = undefined;
      this.uploadInProgress = false;
    });
  }

  private toggleForm(): void {
    const recordType: string = this.recordTypeSelectorForm.get('recordTypeSelector').value;
    this.showDropdown = recordType && recordType === 'existing';
    this.showForm = !this.showDropdown;

    if (this.showDropdown) {
      this.animalDropDownForm.get('selectedAnimal').setValue('-1');
    }
  }

  private static hasContent(data: any): boolean {
    return data && data.page && data.page.totalElements > 0
  }

  get AnimalForm() {
    return this.animalForm;
  }

  private loadAnimalForLink(): void {
    const selectedAnimalIndex = +this.animalDropDownForm.get('selectedAnimal').value;
    console.log('selectedAnimalIndex = ', (selectedAnimalIndex > -1));
    if (selectedAnimalIndex > -1) {
      this.linking = true;
      const selectedAnimal = this.allAnimals[selectedAnimalIndex];

      console.log('Selected animal:', selectedAnimal);
      const animalType = <AnimalTypeModel>selectedAnimal.animalType;
      const foodHabitType = <FoodHabitModel>selectedAnimal.foodHabitType;
      const existenceStatus = <ExistenceStatusModel>selectedAnimal.existenceStatus;

      this.animalForm.get('animalName').setValue(selectedAnimal.animalName);
      this.animalForm.get('scientificName').setValue(selectedAnimal.scientificName);
      this.animalForm.get('gender').setValue(selectedAnimal.animalGender);

      this.animalForm.get('animalType').setValue(this.animalTypeList.find(t => t.animalTypeId === animalType.animalTypeId).getSelfLink());
      this.animalForm.get('foodHabit').setValue(this.foodHabitList.find(t => t.foodHabitTypeId === foodHabitType.foodHabitTypeId).getSelfLink());
      this.animalForm.get('existenceStatus').setValue(this.existenceStatusList.find(t => t.existenceStatusId === existenceStatus.existenceStatusId).getSelfLink());

      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
}

function validateUploadedImage(control: AbstractControl): { [key: string]: any } {
  const file: string = control.value;
  if (file && !file.endsWith('jpg')) {
    return {'invalidFileExt': true};
  }
  return null;
}
