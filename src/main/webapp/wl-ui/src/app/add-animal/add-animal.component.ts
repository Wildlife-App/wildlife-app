import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorUtils} from "../utils/validator-utils";
import {HttpService} from "../http.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DATE_FORMAT, doErrorFormalities, prepareUrl} from "../app.constants";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalTypeModel} from "../models/animal-type.model";
import {FoodHabitModel} from "../models/food-habit.model";
import {ExistenceStatusModel} from "../models/existence-status.model";
import {AnimalModel} from "../models/animal.model";
import {TourModel} from "../models/tour.model";
import {LocationModel} from "../models/location.model";
import {AnimalPostModel} from "../models/post-models/animal-post.model";
import {FileUploadModel} from "../models/post-models/file-upload.model";
import {TourPostModel} from "../models/post-models/tour-post.model";
import {DisplayMessageModel} from "../models/display.message.model";

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
  private currentAnimal: AnimalPostModel;
  private formTitleText: string = this.defaultFormTitleText;
  private fileToBeUploaded: File;
  private imgUrl: string;
  private uploadStatus: 'success' | 'fail';
  private uploadInProgress: boolean;
  private recordTypeSelectorForm: FormGroup;
  private animalDropDownForm: FormGroup;
  private allAnimalsInRecord: AnimalModel[] = [];
  private showDropdown: boolean;
  private showForm: boolean;
  private currentTour: TourPostModel;
  private linking: boolean;
  private displayMessage: DisplayMessageModel = DisplayMessageModel.create();

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router,
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
    this.resolveTourIfExists();
    this.fetchAllAnimals();
    // this.fetchSpottedAnimals();

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
        this.animalDropDownForm.get('selectedAnimal').setValue('');
      }
    });

    this.animalDropDownForm.valueChanges.subscribe(data => {
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
    if (routeData) {
      const tour: TourModel = TourModel.fromDataForView(routeData);
      let location: LocationModel;

      if (tour.location instanceof LocationModel) {
        location = <LocationModel>tour.location;
        this.formTitleText = 'New spotted animal at ' + location.locationName
          + ' (' + tour.startDate + ' to ' + tour.endDate + ')';
      }
      this.currentTour = tour.toPostModel();
    } else {
      this.formTitleText = this.defaultFormTitleText;
    }

  }

  private fetchSpottedAnimals(): void {
    const spottedAnimalsData: any = this.activatedRoute.snapshot.data['spottedAnimals'];
    console.log('spottedAnimals fetched', spottedAnimalsData);
    if (spottedAnimalsData.content && spottedAnimalsData.content.length > 0 && spottedAnimalsData.content[0].animalName) {
      (<AnimalModel[]>spottedAnimalsData.content).forEach(animal => {
        const animalObj = AnimalModel.fromData(animal);
        this.currentTour.Animal(animalObj.getSelfLink());
      });
    }
  }

  private fetchAllAnimals(): void {
    const allAnimalData: any = this.activatedRoute.snapshot.data['allAnimals'];
    console.log('allAnimalData fetched', allAnimalData);
    if (AddAnimalComponent.hasContent(allAnimalData)) {
      (<AnimalModel[]>allAnimalData.content).forEach(animal => {
        const animalObj = AnimalModel.fromData(animal);
        this.allAnimalsInRecord.push(animalObj);
      });
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
    this.currentAnimal = AnimalPostModel.newInstance()
      .AnimalName(this.animalForm.get('animalName').value)
      .ScientificName(this.animalForm.get('scientificName').value)
      .AnimalGender(this.animalForm.get('gender').value)
      .AnimalType(this.animalForm.get('animalType').value)
      .ExistenceStatus(this.animalForm.get('existenceStatus').value)
      .FoodHabitType(this.animalForm.get('foodHabit').value);

    const imageLink = this.animalForm.get('imageLink').value;
    console.log('imageLink-------', imageLink);
    console.log('Posting data', this.currentAnimal);

    this.resetForm();
  }

  private saveAnimal(addMore?: boolean) {
    this.prepareAnimalObjectForSave();

    this.httpService.postResource(prepareUrl(['animals']), this.currentAnimal).subscribe(data => {
      console.log('Saved animal', data);
      const animalObj = AnimalModel.fromData(data);
      this.allAnimalsInRecord.push(animalObj);

      this.currentTour.Animal(animalObj.getSelfLink());

      console.log('this.currentTour {{{{{{{}}}}}}', this.currentTour);
      this.httpService.patchResource(prepareUrl(['tours', this.currentTour.tourId.toString()]), this.currentTour).subscribe(tour => {
        console.log('After update', tour);
      });

      if (!addMore) {
        this.displayMessage.newInfoMessage('Animal added and linked to the tour. Navigating to the details page..');
        this.navigate();
      }

    }, error => {
      console.log('Error occurred', error);
      doErrorFormalities(error, this.formErrors);
    });
  }

  private linkAnimal(): void {
    const selectedAnimal: string = this.animalDropDownForm.get('selectedAnimal').value;

    this.currentTour.spottedAnimals.length = 0;

    this.fetchSpottedAnimals();
    this.currentTour.Animal(selectedAnimal);

    console.log('Patching verification >>>>> ', this.allAnimalsInRecord, this.currentTour.spottedAnimals);

    this.httpService.patchResource(prepareUrl(['tours', this.currentTour.tourId.toString()]), this.currentTour).subscribe(tour => {
      this.animalDropDownForm.get('selectedAnimal').setValue('');
      console.log('After update', tour);
      this.displayMessage.newInfoMessage('Animal linked to the tour. Navigating to the details page..');
      this.navigate();
    });
  }

  private navigate(): void {
    const tourId = this.currentTour.tourId;
    this.init();
    setTimeout(() => {
        this.router.navigate(['/tours', tourId]).then(r => console.log('After navigate', r));
      },
      3000);
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

  private uploadImage(): void {
    if (!this.fileToBeUploaded) {
      console.log('Nothing to be uploaded');
      return;
    }
    this.animalForm.get('imageLink').setValue('');
    const formData = new FormData();
    formData.append('file', this.fileToBeUploaded, this.fileToBeUploaded.name);
    const request: FileUploadModel = new FileUploadModel(this.fileToBeUploaded, this.fileToBeUploaded.name, 'A', 0, 0);
    this.uploadInProgress = true;
    this.httpService.postResource(prepareUrl(['upload']), formData).subscribe(data => {
      this.uploadStatus = 'success';
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

  init() {
    this.allAnimalsInRecord.length = 0;
    this.currentTour.reset();
  }
}

function validateUploadedImage(control: AbstractControl): { [key: string]: any } {
  const file: string = control.value;
  if (file && !file.endsWith('jpg')) {
    return {'invalidFileExt': true};
  }
  return null;
}
