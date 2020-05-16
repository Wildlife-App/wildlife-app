import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationDetailsComponent } from './new-location-details.component';

describe('NewLocationDetailsComponent', () => {
  let component: NewLocationDetailsComponent;
  let fixture: ComponentFixture<NewLocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLocationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
