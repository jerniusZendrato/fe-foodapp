import { Component } from '@angular/core';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userName: string = 'Log in as Guest';

  constructor(
    public derect : DerectService
  ){

  }
}
