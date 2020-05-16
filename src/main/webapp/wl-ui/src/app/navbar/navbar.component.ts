import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: HttpService) {
  }

  menus = [];


  ngOnInit() {
    this.loadConstantMenu();

  }
  loadFromService() {
    this.service.get('/menus').subscribe(data => {
      console.log('Menu items received: ', data);
      for (let item of data.content) {
        console.log('Pushing menu item ', item);
        this.menus.push(item);
      }
    }, error => {
      console.log('Error while fetching menu', error);
    });
  }
  loadConstantMenu() {
    const locationMenu = {
      menuText: 'Locations',
      link: '#',
      submenus: [
        {
          menuText: 'New Location',
          link: '/locations'
        },
        {
          menuText: 'Tour',
          link: '/newtour'
        }
      ]
    };
    const homeMenu = {
      menuText: 'Home',
      link: '/home',
    }
    const addMenu = {
      menuText: 'Add',
      link: '/add',
    }

    this.menus.push(homeMenu);
    this.menus.push(addMenu);
    this.menus.push(locationMenu);
  }

}
