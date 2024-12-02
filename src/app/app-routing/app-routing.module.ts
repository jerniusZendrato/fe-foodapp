import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMenuComponent } from '../components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from '../components/dashboard/master/master.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: DashboardMenuComponent },
  { path: 'product', component: MasterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect ke /home jika URL kosong
  { path: '**', redirectTo: '/home' }, // Redirect ke /home untuk URL yang tidak ditemukan
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
