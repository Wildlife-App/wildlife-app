import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-location-details',
  templateUrl: './new-location-details.component.html',
  styleUrls: ['./new-location-details.component.css']
})
export class NewLocationDetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
