import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
    MasterCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
