import {Component, OnInit} from '@angular/core';
import {HOME_URI, NEW_TOUR_LANDING_URI, WILDLIFE_URI} from "../app.constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  private menus = [];

  ngOnInit() {
    this.loadConstantMenu();
  }

  /*private loadFromService() {
    this.service.getResource(prepareUrl(['/menus'])).subscribe(data => {
      console.log('Menu items received: ', data);
      for (let item of data.content) {
        console.log('Pushing menu item ', item);
        this.menus.push(item);
      }
    }, error => {
      console.log('Error while fetching menu', error);
    });
  }*/

  private loadConstantMenu() {
    const locationMenu = {
      menuText: 'New Tour',
      link: NEW_TOUR_LANDING_URI
    };
    const homeMenu = {
      menuText: 'Home',
      link: HOME_URI,
    };
    const addMenu = {
      menuText: 'Wildlife',
      link: WILDLIFE_URI,
    };

    this.menus.push(homeMenu);
    this.menus.push(addMenu);
    this.menus.push(locationMenu);
  }
}
