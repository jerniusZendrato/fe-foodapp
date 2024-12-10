import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMenuComponent } from '../components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from '../components/dashboard/master/master.component';
import { RouterModule, Routes } from '@angular/router';
import { MasterCategoryComponent } from '../components/dashboard/master-category/master-category.component';

const routes: Routes = [
  { path: 'home', component: DashboardMenuComponent },
  { path: 'product', component: MasterComponent },
  { path: 'category', component:MasterCategoryComponent},
  { path: '**', component: DashboardMenuComponent } 
];
console.log('Defined Routes:', routes);

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
