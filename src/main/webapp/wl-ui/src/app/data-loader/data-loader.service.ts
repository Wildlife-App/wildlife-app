import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {LocationModel} from "../models/location.model";
import {TourModel} from "../models/tour.model";
import {CountryModel} from "../models/country.model";
import {prepareUrl} from "../app.constants";

export class DataLoaderService {
  private locations: LocationModel[] = [];
  private tours: TourModel[] = [];
  private countries: CountryModel[] = [];

  constructor(private httpService: HttpService) {
    console.log('Data Service loading.....');
    this.update();
  }

  private loadLocations(): void {
    this.locations.length = 0;
    this.httpService.getResource(prepareUrl(['/locations'])).subscribe((data: LocationModel[]) => {
      data.forEach(fetchedLocation => this.locations.push(LocationModel.fromData(fetchedLocation)));
    });
  }

  private loadTours(): void {
    this.tours.length = 0;
    this.httpService.getResource(prepareUrl(['/tours'])).subscribe((data: TourModel[]) => {
      data.forEach(fetchedTour => this.tours.push(TourModel.fromDataForView(fetchedTour)));
    });
  }

  private loadCountries(): void {
    this.countries.length = 0;
    this.httpService.getResource(prepareUrl(['/countries'])).subscribe((data: CountryModel[]) => {
      data.forEach(fetchedCountry => this.countries.push(CountryModel.fromCountry(fetchedCountry)));
    });
  }

  get Countries(): CountryModel[] {
    return this.countries;
  }

  get Locations(): LocationModel[] {
    return this.locations;
  }

  update(): void {
    this.loadLocations();
    this.loadCountries();
    this.loadTours();
  }
}
