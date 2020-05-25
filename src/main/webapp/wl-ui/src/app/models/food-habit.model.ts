import {BaseResource} from "./base.resource";

export class FoodHabitModel extends BaseResource {
  constructor(foodHabitTypeId: string, foodHabitType: string, foodHabitTypeDefinition: string) {
    super();
    this.foodHabitTypeId = foodHabitTypeId;
    this.foodHabitType = foodHabitType;
    this.foodHabitTypeDefinition = foodHabitTypeDefinition;
  }

  foodHabitTypeId: string;
  foodHabitType: string;
  foodHabitTypeDefinition: string;

  static fromData(data: FoodHabitModel): FoodHabitModel {
    const foodHabit = new FoodHabitModel(data.foodHabitTypeId, data.foodHabitType, data.foodHabitTypeDefinition);
    foodHabit.links = foodHabit.fromLinks(data.links);
    return foodHabit;
  }

  static createEmpty(): FoodHabitModel {
    return new FoodHabitModel('', '', '');
  }
}
