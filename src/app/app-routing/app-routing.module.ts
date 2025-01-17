import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMenuComponent } from '../components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from '../components/dashboard/master/master.component';
import { RouterModule, Routes } from '@angular/router';
import { MasterCategoryComponent } from '../components/dashboard/master-category/master-category.component';
import { MenuComponent } from '../components/costumer/view/menu/menu.component';
import { CostumerComponent } from '../components/costumer/view/costumer.component';
import { SidebarComponent } from '../components/dashboard/sidebar/sidebar.component';
import { CartComponent } from '../components/costumer/view/cart/cart.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { WelcomeComponent } from '../components/costumer/view/welcome/welcome.component';

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
