import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSettingsComponent } from './request-settings.component';

describe('RequestSettingsComponent', () => {
  let component: RequestSettingsComponent;
  let fixture: ComponentFixture<RequestSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
