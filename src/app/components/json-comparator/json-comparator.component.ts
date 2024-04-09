import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatExpansionModule} from '@angular/material/expansion'
import {PageEvent} from "@angular/material/paginator";
import {ComparatorService} from "../../services/comparator.service";

@Component({
  selector: 'app-json-comparator',
  templateUrl: './json-comparator.component.html',
  styleUrls: ['./json-comparator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonComparatorComponent implements  OnInit{

  comparisons: any;

  showIndex = -1;
  isClicked =  false;
  pageSize = 10;
  paginatedItems: any;
  pageIndex = 0;
  totalItems = 0;
  showFiltered = false;
  manipuleJsons = false;
  onlyErrors = false;

  constructor(private clipboard: Clipboard, private comparatorService: ComparatorService) {
  }

  ngOnInit(): void {
    this.comparatorService.value$.subscribe(comparisons =>  {
      this.comparisons = comparisons
      this.updateCurrentPageData()
    } )
  }

  copyText(textToCopy: any) {
    this.clipboard.copy(JSON.stringify(textToCopy));
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Actualizar los datos de la página actual
    this.updateCurrentPageData();
  }

  updateCurrentPageData() {
    if (this.comparisons) {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      if (this.onlyErrors) {
        const errorItems = this.comparisons.filter((c: any) => c.differences != null)
        this.paginatedItems = errorItems.slice(startIndex, endIndex);
        this.totalItems = errorItems.length
      } else {
        this.paginatedItems = this.comparisons.slice(startIndex, endIndex);
        this.totalItems = this.comparisons.length
      }
      this.showFiltered = true
    }
  }
}
