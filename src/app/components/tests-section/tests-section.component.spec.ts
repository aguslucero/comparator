import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsSectionComponent } from './tests-section.component';

describe('TestsSectionComponent', () => {
  let component: TestsSectionComponent;
  let fixture: ComponentFixture<TestsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
