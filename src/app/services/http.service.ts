import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  makeRequest(url: string, method: string, body: any, headers?: any) {

    let requestBody = {body: body, config: {
        headers: headers ? headers : {'Content-Type': 'application/json'},
      }, url: url, method: method}
        return this.http.post("/api/compare" , requestBody);
  }
}
