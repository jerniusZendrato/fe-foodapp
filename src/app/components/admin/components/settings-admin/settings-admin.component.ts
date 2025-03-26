import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {
  async ngOnInit() {

  }
  constructor(
    private loaderService: LoaderService
  ){}

  menuItems: string[] = ['Edit Profile', 'Change Password'];
  activeItem: string = this.menuItems[0]; // Default aktif

  setActive(item: string) {
    this.activeItem = item;
  }
}
