import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {  // ✅ Implement AfterViewInit
  @ViewChild(SidebarComponent) SidebarComponent!: SidebarComponent;
  isRotated : boolean= false;
  constructor(private sidebarService: SidebarService) {}
  
  calltoggleSidebar() {  
    this.isRotated = !this.isRotated;  // ✅ Toggle nilai dari true ke false atau sebaliknya
    this.sidebarService.toggleSidebar();
    console.log('isRotated:', this.isRotated); // Debugging
  }

  


  // ngAfterViewInit() {   // ✅ Pastikan ViewChild telah siap sebelum digunakan
  //   if (!this.SidebarComponent) {
  //     console.error("SidebarComponent is not available!");
  //   }
  // }
  // calltoggleSidebar() {
  //   if (this.SidebarComponent) {   // ✅ Cek apakah SidebarComponent sudah terinisialisasi
  //     this.SidebarComponent.toggleSidebar();
  //     this.isRotated = !this.isRotated;
  //   } else {
  //     console.error("SidebarComponent is still undefined!");
  //   }
  // }
  // calltoggleSidebar() {
  //   this.SidebarComponent.toggleSidebar();
  //   this.isRotated = !this.isRotated;

  // }
}
