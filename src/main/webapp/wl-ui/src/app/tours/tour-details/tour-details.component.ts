import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TourModel} from "../../models/tour.model";
import {
  FROM_ROOT,
  NEW_TOUR_EXISTING_LOCATION_URI,
  NEW_TOUR_LANDING_URI,
  prepareUrl,
  WILDLIFE_URI
} from "../../app.constants";
import {AnimalModel} from "../../models/animal.model";
import {HttpService} from "../../http.service";
import {ResourceImageModel} from "../../models/resource-image.model";
import {ModalDirective} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  readonly uriFromRoot: string = FROM_ROOT;
  readonly uriWildlife: string = WILDLIFE_URI;
  readonly defaultImageUrl: string = 'assets/images/no-image.png';
  readonly linkImageUrl: string = 'assets/images/link.png';
  modalTitle: string;

  private tour: TourModel = TourModel.empty();
  private spottedAnimals: AnimalModel[] = [];
  private fileToBeUploaded: any;
  private uploadForm: FormGroup;
  private imgUrl: string;
  private uploadInProgress: boolean;
  private uploadStatus: string;
  private animalForImage: AnimalModel;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.resolveRouteVariable();
  }

  buildUploadForm(): void {
    this.uploadForm = this.builder.group({});
  }

  private resolveRouteVariable() {
    const currentTourData: any = this.activatedRoute.snapshot.data['tourDetails'];
    this.tour = TourModel.fromDataForView(currentTourData);

    const spottedAnimalsData: any = this.activatedRoute.snapshot.data['spottedAnimals'];

    if (spottedAnimalsData && spottedAnimalsData.content && spottedAnimalsData.content.length > 0) {
      (<AnimalModel[]>spottedAnimalsData.content).forEach(data => {
        if (data.resourceId && data.animalName) {
          this.spottedAnimals.push(AnimalModel.fromData(data));
        }
      });
    }
    this.loadImage();
  }

  private navigateToEditTour() {
    this.router.navigate([NEW_TOUR_LANDING_URI, NEW_TOUR_EXISTING_LOCATION_URI],
      {queryParams: {'editing': this.tour.resourceId}})
      .finally();
  }

  private navigateToAddAnimal() {
    this.router.navigate([this.uriFromRoot, this.uriWildlife],
      {'queryParams': {'tourId': this.tour.resourceId}})
      .finally();
  }

  private loadImage() {
    this.spottedAnimals.forEach(animal => {
      this.httpService.getResource(prepareUrl(['images', 'find'],
        [{animalId: animal.animalId}, {tourId: this.tour.tourId}])).subscribe(data => {
        if (data && data.length > 0) {
          animal.addResourceImage(ResourceImageModel.fromData(data[0]));
        }
      });
    });

  }

  private openModal(template: ModalDirective, animal: AnimalModel) {
    this.modalTitle = animal.animalName;
    this.animalForImage = animal;
    template.show();
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

  private uploadImage(template: ModalDirective): void {
    if (!this.fileToBeUploaded) {
      console.log('Nothing to be uploaded');
      return;
    }
    const form: FormData = new FormData();

    form.append('file', this.fileToBeUploaded);
    form.append('caption', this.animalForImage.animalName);
    form.append('resourceType', 'A');
    form.append('animalId', this.animalForImage.animalId.toString());
    form.append('tourId', this.tour.tourId.toString());

    this.uploadInProgress = true;

    const options = {
      reportProgress: true
    };

    this.httpService.postResource(prepareUrl(['upload']), form, options).subscribe(data => {
      this.uploadStatus = 'success';
      this.animalForImage.addResourceImage(ResourceImageModel.fromData(data));
      template.hide();
    }, error => {
      console.log('Error = ', error);
      this.uploadStatus = 'fail';
    }, () => {
      this.fileToBeUploaded = undefined;
      this.uploadInProgress = false;
    });
  }
}
