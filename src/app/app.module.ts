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
import { MenuComponent } from './components/costumer/menu/menu.component';
import { CostumerComponent } from './components/costumer/costumer.component';
import { FilterByCategoryPipe } from './components/costumer/menu/filter-by-category.pipe';
import { CartComponent } from './components/costumer/cart/cart.component';
import { WelcomeComponent } from './custumer/welcome/welcome.component';

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
    WelcomeComponent
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
