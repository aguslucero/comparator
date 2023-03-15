import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-postman-form',
  templateUrl: './postman-form.component.html',
  styleUrls: ['./postman-form.component.scss'],
})
export class PostmanFormComponent {

constructor(private httpService: HttpService){}

  requestUrl = ''
  inputHeaders = [
    { key: '', value: '' },
    { key: '', value: '' },
  ];
  body = '';
  json1 = {}
  json2 = {}
  selectedMethod: string = 'GET';

  headersTabActive = true;
  bodyTabActive = false;
  selectClass = 'select-get'

  activateHeadersTab() {
    this.headersTabActive = true;
    this.bodyTabActive = false;
  }

  activateBodyTab() {
    this.headersTabActive = false;
    this.bodyTabActive = true;
  }

  addHeader() {
    this.inputHeaders.push({ key: '', value: '' });
  }

  removeHeader(index: number) {
    if (this.inputHeaders.length > 2) {
      this.inputHeaders.splice(index, 1);
    } else {
      this.inputHeaders[index] = { key: '', value: '' };
    }
  }

  addNewInput() {
    if (this.inputHeaders[this.inputHeaders.length - 1].value) {
      this.inputHeaders.push({ key: '', value: '' });
    }
  }

  compare() {
    let validheaders = this.inputHeaders.filter(header => header.key != null && header.value && null)
    const headers = validheaders.reduce((acc, curr) => {
      return acc.set(curr.key, curr.value);
    }, new HttpHeaders());
   this.httpService.makeRequest(this.requestUrl, this.selectedMethod, this.body).subscribe(data => {
    this.json1 = data
   })
   this.httpService.makeRequest(this.requestUrl, this.selectedMethod,this.body, headers).subscribe(data => {
    this.json2 = data
   })
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
}
