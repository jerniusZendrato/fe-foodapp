import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AutenticationsComponent } from './components/autentications/autentications.component';
import { LoginComponent } from './components/autentications/login/login.component';
import { ExampleComponent } from './components/autentications/example/example.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { DashboardMenuComponent } from './components/dashboard/dashboard-menu/dashboard-menu.component';
import { MasterComponent } from './components/dashboard/master/master.component';
import { FormsModule } from '@angular/forms';
import { MasterCategoryComponent } from './components/dashboard/master-category/master-category.component';
import { LoaderComponent } from './loader/loader.component';
import { MenuComponent } from './components/costomer/view/menu/menu.component';
import { CostumerComponent } from './components/costomer/view/costumer.component';
import { FilterByCategoryPipe } from './components/costomer/view/menu/filter-by-category.pipe';
import { CartComponent } from './components/costomer/view/cart/cart.component';
import { WelcomeComponent } from './components/costomer/view/welcome/welcome.component';
import { ProductCardComponent } from './components/costomer/components/product-card/product-card.component';
import { StatusComponent } from './components/costomer/view/status/status.component';

@NgModule({
  declarations: [
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
    MenuComponent,
    CostumerComponent,
    FilterByCategoryPipe,
    CartComponent,
    WelcomeComponent,
    ProductCardComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
