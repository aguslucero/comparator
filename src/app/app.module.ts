import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostmanFormComponent } from './components/postman-form/postman-form.component';
import { FormsModule } from '@angular/forms';
import { JsonComparatorComponent } from './components/json-comparator/json-comparator.component';
import { HttpClientModule } from '@angular/common/http'
import {NgxJsonViewerModule} from "ngx-json-viewer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import { HeadersSelectionComponent } from './components/headers-selection/headers-selection.component';
import { RequestSettingsComponent } from './components/request-settings/request-settings.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { TestsSectionComponent } from './components/tests-section/tests-section.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    PostmanFormComponent,
    JsonComparatorComponent,
    HeadersSelectionComponent,
    RequestSettingsComponent,
    TestsSectionComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxJsonViewerModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
