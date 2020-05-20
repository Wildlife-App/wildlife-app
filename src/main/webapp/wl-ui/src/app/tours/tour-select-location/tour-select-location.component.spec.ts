import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSelectLocationComponent } from './tour-select-location.component';

describe('TourSelectLocationComponent', () => {
  let component: TourSelectLocationComponent;
  let fixture: ComponentFixture<TourSelectLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSelectLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
