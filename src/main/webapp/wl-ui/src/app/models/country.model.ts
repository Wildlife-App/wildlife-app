import {BaseResource} from "./base.resource";

export class CountryModel extends BaseResource {
  countryCode?: string;
  internationalCode: string;
  countryName: string;

  static emptyCountry(): CountryModel {
    const emptyModel = new CountryModel();
    emptyModel.countryName = '-- Select Country --';
    emptyModel.internationalCode = '';
    emptyModel.links = [];
    return emptyModel;
  }

  static fromCountry(data: CountryModel): CountryModel {
    const country = new CountryModel();
    country.countryName = data.countryName;
    country.internationalCode = data.internationalCode;
    country.countryCode = data.internationalCode;
    country.links = country.fromLinks(data.links);
    return country;
  }
}
