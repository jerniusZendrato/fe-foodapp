import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMenuComponent } from '../components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from '../components/dashboard/master/master.component';
import { RouterModule, Routes } from '@angular/router';
import { MasterCategoryComponent } from '../components/dashboard/master-category/master-category.component';
import { MenuComponent } from '../components/costomer/view/menu/menu.component';
import { CostumerComponent } from '../components/costomer/view/costumer.component';
import { SidebarComponent } from '../components/dashboard/sidebar/sidebar.component';
import { CartComponent } from '../components/costomer/view/cart/cart.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { WelcomeComponent } from '../components/costomer/view/welcome/welcome.component';
import { StatusComponent } from '../components/costomer/view/status/status.component';

const routes: Routes = [
  { path: 'admin', component: DashboardComponent,
    children: [
      { path: 'home', component: DashboardMenuComponent },
      { path: 'product', component: MasterComponent },
      { path: 'category', component:MasterCategoryComponent},
    ]
  },
  { path: '', component: CostumerComponent, 
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'cart', component: CartComponent },
      { path: 'status', component: StatusComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
