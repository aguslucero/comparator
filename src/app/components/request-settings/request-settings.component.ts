import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import Settings from "../../models/settings";

@Component({
  selector: 'app-request-settings',
  templateUrl: './request-settings.component.html',
  styleUrls: ['./request-settings.component.scss']
})
export class RequestSettingsComponent implements OnInit{

  settings: Settings;
  title = "ignore Move in arrays";
  description = "no se mostraran las diferencias de orden dentro de un array como diferencias";
  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.getCurrentSettings();
  }
  ngOnInit(): void {
    this.settingsService.value$.subscribe(settings => {
      this.settings = settings
    })
  }

  updateSettings() {
    this.settingsService.update(this.settings)
  }
}
