import { Component,ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(SidebarComponent) SidebarComponent!: SidebarComponent;
  isRotated = false;  

  calltoggleSidebar() {
    this.SidebarComponent.toggleSidebar();
    this.isRotated = !this.isRotated;

  }
 

}
