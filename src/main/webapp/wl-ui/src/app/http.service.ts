import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getResource(url: string): Observable<any> {
    console.log('Requesting data from ', url);
    return this.http.get(url);
  }

  postResource(url: string, data: any): Observable<any> {
    console.log('Posting data to ', url);
    return this.http.post(url, data);
  }

  putResource(url: string, data: any): Observable<any> {
    console.log('Putting data to ', url);
    return this.http.put(url, data);
  }
}
