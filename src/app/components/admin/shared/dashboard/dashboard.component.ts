import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { AdminLogin } from '../../models/admin-login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {  // ✅ Implement AfterViewInit
  @ViewChild(SidebarComponent) SidebarComponent!: SidebarComponent;
  isRotated : boolean= false;
  ngOnInit(): void {
    this.userlogin()
  }
  constructor(private sidebarService: SidebarService,
    private router: Router
  ) {}
  
  calltoggleSidebar() {  
    this.isRotated = !this.isRotated;  // ✅ Toggle nilai dari true ke false atau sebaliknya
    this.sidebarService.toggleSidebar();
    console.log('isRotated:', this.isRotated); // Debugging
  }

  datalogin: AdminLogin[]=[]

  userlogin(){
    const data = localStorage.getItem('datalogin')
    if (data) {
      this.datalogin = JSON.parse(data);
      console.log("this.datalogin",this.datalogin)
    }
  }
  signout(){
        localStorage.removeItem('datalogin');
        this.router.navigate(['/autentication']);
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
