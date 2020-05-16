import {Component, Input, OnInit} from '@angular/core';
import {DisplayMessageModel} from "../models/display.message.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input('displayMessage') displayMessage: DisplayMessageModel;

}
