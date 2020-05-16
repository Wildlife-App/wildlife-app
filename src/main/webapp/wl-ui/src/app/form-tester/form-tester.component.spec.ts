import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTesterComponent } from './form-tester.component';

describe('FormTesterComponent', () => {
  let component: FormTesterComponent;
  let fixture: ComponentFixture<FormTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
