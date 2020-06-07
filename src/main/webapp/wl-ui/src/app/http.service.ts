import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./models/post-models/post.model";

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

  postResource(url: string, data: PostModel, options?: any): Observable<any> {
    console.log('Posting data to ', url, data, options);
    return this.http.post(url, data, options);
  }

  putResource(url: string, data: PostModel): Observable<any> {
    console.log('Putting data to ', url, data);
    return this.http.put(url, data);
  }

  patchResource(url: string, data: PostModel): Observable<any> {
    console.log('Patching data to ', url, data);
    return this.http.patch(url, data);
  }
}
