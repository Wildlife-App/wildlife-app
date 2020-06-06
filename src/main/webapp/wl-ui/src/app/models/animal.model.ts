import {FoodHabitModel} from "./food-habit.model";
import {ExistenceStatusModel} from "./existence-status.model";
import {AnimalTypeModel} from "./animal-type.model";
import {BaseResource} from "./base.resource";
import {ResourceImageModel} from "./resource-image.model";
import {TourModel} from "./tour.model";

export class AnimalModel extends BaseResource {

  constructor(animalName: string, scientificName: string, animalGender: string,
              animalType?: AnimalTypeModel, foodHabitType?: FoodHabitModel,
              existenceStatus?: ExistenceStatusModel, animalId?: number) {
    super();
    this.animalName = animalName;
    this.scientificName = scientificName;
    this.animalGender = animalGender;
    this.animalType = animalType;
    this.foodHabitType = foodHabitType;
    this.existenceStatus = existenceStatus;
    this.animalId = animalId;
  }

  animalId: number;
  resourceId: number;
  animalName: string;
  scientificName: string;
  animalGender: string;
  foodHabitType: FoodHabitModel | string;
  existenceStatus: ExistenceStatusModel | string;
  animalType: AnimalTypeModel | string;
  resourceImages: ResourceImageModel[];
  spottedInTours: TourModel[];

  addResourceImage(id: number, url: string, tourId: number): void {
    if (!this.resourceImages) {
      this.resourceImages = [];
    }
    const resourceImage: ResourceImageModel = new ResourceImageModel((id ? id : 0), url, 'animal', this.animalId, tourId);
    this.resourceImages.push(resourceImage);
  }

  addTour(tour: TourModel): void {
    if (!this.spottedInTours) {
      this.spottedInTours = [];
    }

    this.spottedInTours.push(tour);
  }

  static createEmpty(): AnimalModel {
    return new AnimalModel('', '', '',
      AnimalTypeModel.createEmpty(), FoodHabitModel.createEmpty(), ExistenceStatusModel.createEmpty());
  }

  static fromData(data: AnimalModel): AnimalModel {
    const animal: AnimalModel = new AnimalModel(data.animalName, data.scientificName, data.animalGender);
    animal.animalId = data.resourceId;

    if (data.animalType) {
      animal.animalType = AnimalTypeModel.fromData(<AnimalTypeModel>data.animalType);
    }
    if (animal.foodHabitType) {
      animal.foodHabitType = FoodHabitModel.fromData(<FoodHabitModel>data.foodHabitType);
    }
    if (animal.existenceStatus) {
      animal.existenceStatus = ExistenceStatusModel.fromData(<ExistenceStatusModel>data.existenceStatus);
    }

    animal.links = animal.fromLinks(data.links);

    return animal;
  }
}
