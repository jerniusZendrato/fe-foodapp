import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MasterProductComponent } from './components/admin/components/master-product/master-product.component';
import { ParentAdminComponent } from './components/admin/parent-admin/parent-admin.component';
import { ParentCassierOrderComponent } from './components/admin/parent-cassier-order/parent-cassier-order.component';
import { TransactionCassierAdminComponent } from './components/admin/components/transaction-cassier-admin/transaction-cassier-admin.component';
import { TransactionKitchenAdminComponent } from './components/admin/components/transaction-kitchen-admin/transaction-kitchen-admin.component';
import { TransactionHistoryComponent } from './components/admin/components/transaction-history/transaction-history.component'
import { MasterCategoryComponent } from './components/admin/components/master-category/master-category.component';
import { MasterTableComponent } from './components/admin/components/master-table/master-table.component';
import { SidebarComponent } from './components/admin/shared/sidebar/sidebar.component';
import { MasterHomeComponent } from './components/admin/components/master-home/master-home.component';
import { DashboardComponent } from './components/admin/shared/dashboard/dashboard.component';
import { LoaderComponent } from './components/admin/shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterTableComponent,
    MasterProductComponent,
    ParentAdminComponent,
    ParentCassierOrderComponent,
    TransactionCassierAdminComponent,
    TransactionKitchenAdminComponent,
    TransactionHistoryComponent,
    MasterCategoryComponent,
    MasterTableComponent,
    SidebarComponent,
    MasterHomeComponent,
    DashboardComponent,
    LoaderComponent
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
