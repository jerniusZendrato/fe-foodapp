import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = true;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isSidebarVisible = state;
      console.log('Sidebar state updated:', this.isSidebarVisible);
    });

    this.cek_role()
  }
  
  role_user: string =''
  cek_role(){
    const userData = JSON.parse(localStorage.getItem('datalogin') || '[]');
    const role = userData[0]?.role;
    this.role_user = role

  }
  

}
