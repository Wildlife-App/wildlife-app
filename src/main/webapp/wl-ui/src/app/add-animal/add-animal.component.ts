import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorUtils} from "../utils/validator-utils";
import {HttpService} from "../http.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {prepareUrl} from "../app.constants";

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  animalForm: FormGroup;
  foodHabitList: any[] = new Array<any>();
  animalTypeList: any[] = new Array<any>();
  existenceStatusList: any[] = new Array<any>();

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      minDate: new Date(2015, 0, 1),
      maxDate: new Date()
    });
  }

  validationMessages = {
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
      'valid':'Invalid date.'
    }
  };
  formErrors = {
    'animalName': '',
    'scientificName': '',
    'foodHabit': '',
    'animalType': '',
    'existenceStatus': '',
    'gender': '',
    'spottingDate': ''
  };

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      animalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      scientificName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      spottingDate: ['', [Validators.required]],
      animalHabitGroup: this.formBuilder.group({
        gender: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        animalType: ['', [Validators.required]],
        foodHabit: ['', [Validators.required]],
        existenceStatus: ['', [Validators.required]]
      }),
      animalOtherNames: this.formBuilder.array([
        this.newOtherName()
      ]),
      area: [0.0, Validators.min(0.0)]
    });

    this.animalForm.valueChanges.subscribe(data => {
      console.log('Value changed', data);
      this.validateForm(this.animalForm);
    });

    this.fetchAnimalTypes();
    this.fetchFoodHabitTypes();
    this.fetchExistenceStatus();
  }

  newOtherName() {
    return this.formBuilder.group({
      animalOtherName: ['']
    })
  }

  validateForm(group: FormGroup): void {
    ValidatorUtils.validateForm(group, this.validationMessages, this.formErrors);

  }

  fetchAnimalTypes() {
    this.fetchData('/animal-type', this.animalTypeList);
  }

  fetchFoodHabitTypes() {
    this.fetchData('/food-habits', this.foodHabitList);
  }

  fetchExistenceStatus() {
    this.fetchData('/existences', this.existenceStatusList);
  }

  fetchData(url: string, list: any[]) {
    this.httpService.getResource(prepareUrl([url])).subscribe(data => {
      console.log('Fetched data', data);
      for (let a of data.content) {
        list.push(a);
      }
    }, error => {
      console.log('error', error);
    });
  }

  saveAnimal() {
    this.validateForm(this.animalForm);

    if (this.animalForm.get('animalName').value === '') {
      this.formErrors['animalName'] = this.validationMessages['animalName']['required'];
      return false;
    }
    if (this.animalForm.get('scientificName').value === '') {
      this.formErrors['scientificName'] = this.validationMessages['scientificName']['required'];
      return false;
    }
    if (this.animalForm.get('spottingDate').value === '') {
      this.formErrors['spottingDate'] = this.validationMessages['spottingDate']['required'];
    }
    if (this.animalForm.get('animalHabitGroup').get('gender').value === '') {
      this.formErrors['gender'] = this.validationMessages['gender']['required'];
      return false;
    }
    const animal = {
      animalName: this.animalForm.get('animalName').value,
      scientificName: this.animalForm.get('scientificName').value,
      animalGender: this.animalForm.get('animalHabitGroup').get('gender').value,
      animalType: this.animalForm.get('animalHabitGroup').get('animalType').value,
      existenceStatus: this.animalForm.get('animalHabitGroup').get('existenceStatus').value,
      foodHabitType: this.animalForm.get('animalHabitGroup').get('foodHabit').value,
      firstSpottingDate: this.animalForm.get('spottingDate').value
    };
    console.log('Posting data', animal);
    this.httpService.postResource(prepareUrl(['/animals']), animal).subscribe(data => {
      console.log('Saved animal', data);
    }, error => {
      console.log('Error occurred', error);
    })
  }

  /*addOtherNameField() {
    (<FormArray>this.animalForm.get('animalOtherNames')).push(this.newOtherName());
  }

  removeName(id: number) {
    (<FormArray>this.animalForm.get('animalOtherNames')).removeAt(id);
  }*/
}
