import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersSelectionComponent } from './headers-selection.component';

describe('HeadersSelectionComponent', () => {
  let component: HeadersSelectionComponent;
  let fixture: ComponentFixture<HeadersSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadersSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
