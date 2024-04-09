import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Settings from "../models/settings";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  private store: BehaviorSubject<Settings>;
  private settings: Settings = {ignoreMove: true}
  constructor() {
    this.store = new BehaviorSubject<Settings>(this.settings);
  }

  get value$(): Observable<Settings> {
    return this.store.asObservable();
  }

  update(newSettings: Settings) {
    this.store.next(newSettings);
    this.settings = newSettings
  }

  getCurrentSettings(){
    return this.settings
  }
}
