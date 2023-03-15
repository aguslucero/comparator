import { Component, Input } from '@angular/core';
import { diff } from 'jsondiffpatch';

@Component({
  selector: 'app-json-comparator',
  templateUrl: './json-comparator.component.html',
  styleUrls: ['./json-comparator.component.scss'],
})
export class JsonComparatorComponent {
  @Input() json1: any;
  @Input() json2: any;
  diffOutput: any;

  constructor() {
    const differences = diff(this.json1, this.json2);
    this.diffOutput = differences
      ? JSON.stringify(differences, null, 2)
      : 'No hay diferencias';
  }
}
