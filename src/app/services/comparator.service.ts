import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "./http.service";
import * as jsondiffpatch from "jsondiffpatch";
import {SettingsService} from "./settings.service";
import Settings from "../models/settings";

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {

  private store: BehaviorSubject<any>;

   currentRequestQueue = 0;

  private requestQueue: BehaviorSubject<number> = new BehaviorSubject<number>(this.currentRequestQueue);


  comparisons: any = []

  requestIndex = 0



  constructor(private httpService: HttpService, private settingsService: SettingsService) {
    this.store = new BehaviorSubject<any>(null);
    this.store = new BehaviorSubject<number>(this.currentRequestQueue);
  }

  get value$(): Observable<string> {
    return this.store.asObservable();
  }

  get queue$(): Observable<number> {
    return this.requestQueue.asObservable();
  }
  update(comparisons: any) {
    this.store.next(comparisons);
  }
  updateQueue(queue: number) {
    this.currentRequestQueue = queue;
    this.requestQueue.next(queue);
  }


  compare(requestUrl: string, selectedMethod: string, body: any, inputHeaders: any, options?: any) {
    const index = this.requestIndex
    this.comparisons[index] = {}
    this.getDescription(body, options, index)
    this.store.next(this.comparisons)
    this.requestIndex = this.requestIndex + 1
    let validheaders = inputHeaders.filter((header : any) => header.key != null && header.value)
    const headers = validheaders.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr.key]: curr.value
      };
    }, {});
    this.httpService.makeRequest(requestUrl, selectedMethod, body).subscribe(data => {
      this.comparisons[index].json1 = data
      console.log('data1', data)
      this.compareJSON(this.comparisons[index].json1, this.comparisons[index].json2, index)
    })
    this.httpService.makeRequest(requestUrl, selectedMethod, body, headers).subscribe(data => {
      this.comparisons[index].json2 = data
      console.log('data2', data)
      this.compareJSON(this.comparisons[index].json1, this.comparisons[index].json2, index)
    })
    console.log(headers)
  }

  replicate(requestUrl: string, selectedMethod: string, body: any, inputHeaders: any, options?: any) {
    const index = this.requestIndex
    this.comparisons[index] = {}
    this.getDescription(body, options, index)
    this.store.next(this.comparisons)
    this.requestIndex = this.requestIndex + 1
    let validheaders = inputHeaders.filter((header : any) => header.key != null && header.value)
    const headers = validheaders.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr.key]: curr.value
      };
    }, {});
    this.httpService.makeRequest(requestUrl, selectedMethod, body, headers).subscribe(data => {
      this.comparisons[index].json1 = data
      console.log('data1', data)
      this.compareJSON(this.comparisons[index].json1, this.comparisons[index].json2, index)
    })
    this.httpService.makeRequest(requestUrl, selectedMethod, body, headers).subscribe(data => {
      this.comparisons[index].json2 = data
      console.log('data2', data)
      this.compareJSON(this.comparisons[index].json1, this.comparisons[index].json2, index)
    })
    console.log(headers)
  }


  improveData(data: any, options:String){
    if(options == "MERGE"){
      data.methods = this.sortPayments(data.methods)
      data.expiration = null
    }
  }
  compareJSON(json1: any, json2: any, index: number): any {
    if (json1 && json2) {
      let jdp = jsondiffpatch.create({
        arrays: {
          detectMove: true,
          includeValueOnMove: true,
        },
      });
      if(this.settingsService.getCurrentSettings().ignoreMove){
        json1 = this.sortObjectArrays(json1)
        json2 = this.sortObjectArrays(json2)
      }
      delete json1.timestamp
      delete json2.timestamp
      delete json1.expiration
      delete json2.expiration
      const differences = jdp.diff(json1, json2);
      this.comparisons[index].differences = differences
        ? JSON.stringify(differences, null, 2)
        : null;
      this.store.next(this.comparisons)
      this.currentRequestQueue = this.currentRequestQueue -1;
      this.requestQueue.next(this.currentRequestQueue)
      console.log(differences)
    }
  }

  sortPayments(obj: any): any {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          obj[key].sort(function (a: any, b: any) {
            let strA = "";
            let strB = "";
            for (let prop in a) {
              if (typeof a[prop] === "string") {
                strA += a[prop];
              }
            }
            for (let prop in b) {
              if (typeof b[prop] === "string") {
                strB += b[prop];
              }
            }
            if (strA < strB) {
              return -1;
            }
            if (strA > strB) {
              return 1;
            }
            return 0;
          });
        }
      }
    }
    return obj;
  }

  sortArrays = (json: any): any => {
    if (Array.isArray(json)) {
      json.sort();
      for (let i = 0; i < json.length; i++) {
        this.sortArrays(json[i]);
      }
    } else if (typeof json === 'object') {
      for (let key in json) {
        this.sortArrays(json[key]);
      }
    }
    return json;
  }

  sortObjectArrays = (obj: any) => {
    for (const prop in obj) {
      if (Array.isArray(obj[prop])) {
        obj[prop].sort();
      } else if (typeof obj[prop] === 'object') {
        this.sortObjectArrays(obj[prop]);
      } else if (obj[prop] instanceof Map) {
        this.sortMapObjectArrays(obj[prop]);
      }
    }
    return obj;
  }
  sortMapObjectArrays = (map: Map<any, any>) => {
    for (const [key, value] of map.entries()) {
      if (Array.isArray(value)) {
        value.sort();
      } else if (typeof value === 'object') {
        this.sortObjectArrays(value);
      }
    }
    return map;
  }

  private getDescription(body: any, options: string, index: number) {
    if(options == 'MERGE') {
      this.comparisons[index].description = JSON.parse(body).trip_id;
    }
  }

}
