import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AutenticationsComponent } from './components/autentications/autentications.component';
import { LoginComponent } from './components/autentications/login/login.component';
import { ExampleComponent } from './components/autentications/example/example.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { DashboardMenuComponent } from './components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from './components/dashboard/master/master.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MasterCategoryComponent } from './components/dashboard/master-category/master-category.component';
import { LoaderComponent } from './loader/loader.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MasterTableComponent } from './components/dashboard/master-table/master-table.component';
import { TransaksiCassierAdminComponent } from './components/dashboard/transaksi-cassier-admin/transaksi-cassier-admin.component';
import { MenuComponent } from './components/costomer/view/menu/menu.component';
import { CostumerComponent } from './components/costomer/view/costumer.component';
import { FilterByCategoryPipe } from './components/costomer/view/menu/filter-by-category.pipe';
import { CartComponent } from './components/costomer/view/cart/cart.component';
import { WelcomeComponent } from './components/costomer/view/welcome/welcome.component';
import { ProductCardComponent } from './components/costomer/components/product-card/product-card.component';
import { StatusComponent } from './components/costomer/view/status/status.component';
import { PageNotFoundComponent } from './components/costomer/view/page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,
    AutenticationsComponent,
    LoginComponent,
    ExampleComponent,
    DashboardComponent,
    SidebarComponent,
    DashboardMenuComponent,
    MasterComponent,
    MasterCategoryComponent,
    LoaderComponent,
    CostumerComponent,
    FilterByCategoryPipe,
    MasterTableComponent,
    TransaksiCassierAdminComponent,
    CartComponent,
    WelcomeComponent,
    ProductCardComponent,
    StatusComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
