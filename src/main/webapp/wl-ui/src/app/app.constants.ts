import {parseDate} from "ngx-bootstrap/chronos";

export const TOUR_EXCERPT: string = 'tourExcerpt';
export const ANIMAL_EXCERPT: string = 'animalProjection';
export const HOST: string = 'http://localhost:8090/wildlife/v1';

// URIs
export const ROOT_URI: string = '';
export const FROM_ROOT: string = '/';
export const HOME_URI: string = 'home';
export const TOUR_DETAILS_URI: string = 'tours/:id';
export const TOUR_URI: string = 'tours';
export const WILDLIFE_URI: string = 'wildlife';
export const LOCATIONS_URI: string = 'locations';
export const NEW_TOUR_LANDING_URI: string = 'tourTo';
export const NEW_TOUR_NEW_LOCATION_URI: string = 'newLocation';
export const NEW_TOUR_EXISTING_LOCATION_URI: string = 'existingLocation';
export const WILDCARD_URI: string = '**';

export const DATE_FORMAT: string = 'YYYY-MM-DD';

export declare type QueryParam = {
  [key: string]: any;
};

export function prepareUrl(urlTokens: string[], queryParams?: QueryParam[]): string {
  let finalUrl = HOST;
  for (let token of urlTokens) {
    if (token.startsWith('/')) {
      finalUrl += token;
    } else {
      finalUrl = finalUrl + '/' + token;
    }
  }
  if (queryParams && queryParams.length > 0) {
    let isFirst = true;
    for (let queryParam of queryParams) {
      Object.keys(queryParam).forEach(key => {
        if (isFirst) {
          finalUrl += '?';
          isFirst = false;
        } else {
          finalUrl += '&'
        }
        const value = queryParam[key];
        finalUrl += (key + '=' + value);
      });
    }
  }
  console.log('Final URL: ', finalUrl);
  return finalUrl;
}

export function formatDate(date: Date): string {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  console.log('Day ' + day + ' month - ' + month + ' year - ' + year);

  let formattedDate = year + '-';
  if (month < 10) {
    formattedDate += '0';
  }
  formattedDate += (month + '-');

  if (day < 10) {
    formattedDate += '0';
  }
  formattedDate += day;
  return formattedDate;
}

export function equalDates(date1: any, date2: any): boolean {
  const firstDate: Date = parseDate(date1, DATE_FORMAT);
  const secondDate: Date = parseDate(date2, DATE_FORMAT);
  console.log('First date', firstDate.toDateString());
  console.log('Second date', secondDate.toDateString());

  return firstDate.toDateString() === secondDate.toDateString();
}
