import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonComparatorComponent } from './json-comparator.component';

describe('JsonComparatorComponent', () => {
  let component: JsonComparatorComponent;
  let fixture: ComponentFixture<JsonComparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonComparatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
