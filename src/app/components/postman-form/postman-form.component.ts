import {Component, OnInit} from '@angular/core';
import {HttpService} from 'src/app/services/http.service';
import * as jsondiffpatch from 'jsondiffpatch';
import {SHA256} from 'crypto-js';
import {ComparatorService} from "../../services/comparator.service";


@Component({
  selector: 'app-postman-form',
  templateUrl: './postman-form.component.html',
  styleUrls: ['./postman-form.component.scss'],
})
export class PostmanFormComponent {

  constructor(private comparatorService: ComparatorService) {
  }



  requestUrl = ''
  inputHeaders = [
    {key: 'Content-Type', value: 'application/json'},
    {key: 'xdesp-sandbox', value: 'true'},
    {key: 'x-client', value: 'promos-comparator'},
  ];
  body = null
  json1: any = [];
  json2: any = [];
  diffOutput: any = []

  comparisons: any = []
  selectedMethod: string = 'GET';

  activeTab = 'HEADERS'
  selectClass = 'select-get'

  requestIndex = 0;

  activateHeadersTab() {
    this.activeTab = 'HEADERS'
  }

  activateBodyTab() {
    this.activeTab = 'BODY'
  }

  activateTestsTab() {
    this.activeTab = 'TESTS'
  }

  activateSettingsTab() {
    this.activeTab = 'SETTINGS'
  }


  compare() {
    this.comparatorService.updateQueue(this.comparatorService.currentRequestQueue + 1)
   this.comparatorService.compare(this.requestUrl, this.selectedMethod, this.body, this.inputHeaders)
  }


  onMethodChange() {
    switch (this.selectedMethod) {
      case 'GET':
        this.selectClass = 'select-get';
        break;
      case 'POST':
        this.selectClass = 'select-post';
        break;
      case 'PUT':
        this.selectClass = 'select-put';
        break;
      case 'DELETE':
        this.selectClass = 'select-delete';
        break;
      default:
        this.selectClass = 'select-get';
        break;
    }
  }

  changeHeaders($event: any) {
    this.inputHeaders = $event
    console.log(this.inputHeaders)
  }

  isBodyTab() {
    return this.activeTab === 'BODY'
  }
}
