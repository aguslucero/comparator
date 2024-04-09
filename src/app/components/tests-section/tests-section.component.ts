import {Component, Input, OnInit} from '@angular/core';
import {ComparatorService} from "../../services/comparator.service";
import * as fs from 'fs';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-tests-section',
  templateUrl: './tests-section.component.html',
  styleUrls: ['./tests-section.component.scss']
})
export class TestsSectionComponent implements OnInit{

  queueStatus = 0
  totalQueue = 0
  running = ''

  constructor(private comparatorService: ComparatorService, private http: HttpClient)  {
  }

  ngOnInit(): void {
        this.comparatorService.queue$.subscribe(requestsInQueue => {
          this.queueStatus = requestsInQueue || 0
          console.log(this.queueStatus)
        })
    }

  @Input() inputHeaders: any;
  mergeUrl = "http://cnd-backend/collect/payment-methods/merge"
  shoppingUrl = "http://localhost:9073/collect/shopping/payment-methods"
  diffyUrl: String = '';
  compare(test: String) {
    this.running = 'merge'
    this.http.get<any>('/assets/json-test/merge.json').subscribe(
      response => {
    console.log(response)
    const test = response.tests
        this.totalQueue = test.length
        this.comparatorService.updateQueue(this.totalQueue)
    for (let body of test) {
      this.comparatorService.compare(this.mergeUrl, "POST", body, this.inputHeaders, test)
    }
  })}

  compareShopping(test: String) {
    this.running = "shopping"
    this.http.get<any>('/assets/json-test/merge-shopping.json').subscribe(
      response => {
        console.log(response)
        const test = response.tests
        this.totalQueue = test.length
        this.comparatorService.updateQueue(this.totalQueue)
        for (let body of test) {
          this.comparatorService.replicate(this.shoppingUrl, "POST", body, this.inputHeaders, test)
        }
      })}

  diffy(test: String) {
    let jsonTests = {}
    this.http.get('/assets/json-test/merge.json').subscribe(
      (data: any) => jsonTests = data.tests)
    const body ={}
    this.comparatorService.updateQueue(15)
    for (let i = 0; i < 15; i++) {
      this.comparatorService.compare(this.mergeUrl, "POST", body, this.inputHeaders, test)
    }
  }

}
