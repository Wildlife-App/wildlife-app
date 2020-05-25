import {FoodHabitModel} from "./food-habit.model";
import {ExistenceStatusModel} from "./existence-status.model";
import {AnimalTypeModel} from "./animal-type.model";
import {BaseResource} from "./base.resource";
import {ResourceImageModel} from "./resource-image.model";

export class AnimalModel extends BaseResource {

  constructor(animalName: string, scientificName: string, gender: string,
              animalType: AnimalTypeModel, foodHabit: FoodHabitModel, existenceStatus: ExistenceStatusModel, animalId?: number) {
    super();
    this.animalName = animalName;
    this.scientificName = scientificName;
    this.gender = gender;
    this.animalType = animalType;
    this.foodHabit = foodHabit;
    this.existenceStatus = existenceStatus;
    this.animalId = animalId;
  }

  animalId: number;
  animalName: string;
  scientificName: string;
  gender: string;
  foodHabit: FoodHabitModel | string;
  existenceStatus: ExistenceStatusModel | string;
  animalType: AnimalTypeModel | string;
  resourceImages: ResourceImageModel[];

  addResourceImage(url: string): void {
    if (!this.resourceImages) {
      this.resourceImages = [];
    }
    const resourceImage: ResourceImageModel = new ResourceImageModel(0, url, 'animal', this.animalId);
    this.resourceImages.push(resourceImage);
  }

  static createEmpty(): AnimalModel {
    return new AnimalModel('', '', '',
      AnimalTypeModel.createEmpty(), FoodHabitModel.createEmpty(), ExistenceStatusModel.createEmpty());
  }
}
