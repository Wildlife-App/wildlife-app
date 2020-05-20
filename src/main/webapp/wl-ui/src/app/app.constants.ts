export const TOUR_EXCERPT: string = 'tourExcerpt';
export const HOST: string = 'http://localhost:8090/wildlife/v1';

// URIs
export const ROOT_URI: string = '';
export const HOME_URI: string = 'home';
export const TOUR_DETAILS_URI: string = 'tours/:id';
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
