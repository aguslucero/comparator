import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  makeRequest(url: string, method: string, body: any, headers?: any) {
    let httpOptions = {};
    if (headers && headers.size > 0) {
      httpOptions = {
        headers: new HttpHeaders(headers),
      };
    }
    switch (method) {
      case 'GET':
        return this.http.get(url, httpOptions);
      case 'POST':
        return this.http.post(url, body ? body : {}, httpOptions);
      case 'PUT':
        return this.http.put(url, body ? body : {}, httpOptions);
      case 'DELETE':
        return this.http.delete(url, httpOptions);
      default:
        return this.http.get(url, httpOptions);
    }
  }
}
