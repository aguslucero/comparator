import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-headers-selection',
  templateUrl: './headers-selection.component.html',
  styleUrls: ['./headers-selection.component.scss']
})
export class HeadersSelectionComponent implements OnInit{

  inputHeaders = [
    {key: 'Content-Type', value: 'application/json'},
    {key: 'xdesp-sandbox', value: 'true'},
    {key: 'x-client', value: 'promos-comparator'},
  ];

  @Output() selectedHeaders = new EventEmitter()


 constructor() {
 }

  ngOnInit(): void {
        this.selectedHeaders.emit(this.inputHeaders)
    }

  addHeader() {
    this.inputHeaders.push({key: '', value: ''});
  }

  removeHeader(index: number) {
    if (this.inputHeaders.length > 2) {
      this.inputHeaders.splice(index, 1);
    } else {
      this.inputHeaders[index] = {key: '', value: ''};
    }
  }

  addNewInput() {
    this.selectedHeaders.emit(this.inputHeaders)
  }

}
