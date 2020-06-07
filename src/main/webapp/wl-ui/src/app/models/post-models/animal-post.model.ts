import {PostModel} from "./post.model";
import {ResourceImageModel} from "../resource-image.model";

export class AnimalPostModel implements PostModel {
  private animalId: number;
  private resourceId: number;
  private animalName: string;
  private scientificName: string;
  private animalGender: string;
  private foodHabitType: string;
  private existenceStatus: string;
  private animalType: string;
  private resourceImages: ResourceImageModel[];

  static newInstance(): AnimalPostModel {
    return new AnimalPostModel();
  }

  AnimalId(value: number) {
    this.animalId = value;
    return this;
  }

  ResourceId(value: number) {
    this.resourceId = value;
    return this;
  }

  AnimalName(value: string) {
    this.animalName = value;
    return this;
  }

  ScientificName(value: string) {
    this.scientificName = value;
    return this;
  }

  AnimalGender(value: string) {
    this.animalGender = value;
    return this;
  }

  FoodHabitType(value: string) {
    this.foodHabitType = value;
    return this;
  }

  ExistenceStatus(value: string) {
    this.existenceStatus = value;
    return this;
  }

  AnimalType(value: string) {
    this.animalType = value;
    return this;
  }

  ResourceImages(value: ResourceImageModel[]) {
    this.resourceImages = value;
    return this;
  }

}
