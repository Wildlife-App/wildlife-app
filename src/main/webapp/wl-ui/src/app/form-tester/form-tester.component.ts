import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-tester',
  templateUrl: './form-tester.component.html',
  styleUrls: ['./form-tester.component.css']
})
export class FormTesterComponent implements OnInit {
  @Input('form') form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
