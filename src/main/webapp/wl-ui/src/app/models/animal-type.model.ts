import {BaseResource} from "./base.resource";

export class AnimalTypeModel extends BaseResource {
  constructor(animalTypeId: string,
              animalTypeName: string,
              animalTypeDefinition: string) {
    super();
    this.animalTypeId = animalTypeId;
    this.animalTypeName = animalTypeName;
    this.animalTypeDefinition = animalTypeDefinition;
  }

  animalTypeId: string;
  animalTypeName: string;
  animalTypeDefinition: string;

  private resourceId: string;

  static fromData(data: AnimalTypeModel): AnimalTypeModel {
    const animalType = new AnimalTypeModel(data.resourceId, data.animalTypeName, data.animalTypeDefinition);
    animalType.links = animalType.fromLinks(data.links);

    return animalType;
  }

  static createEmpty(): AnimalTypeModel {
    return new AnimalTypeModel('', '', '');
  }
}
